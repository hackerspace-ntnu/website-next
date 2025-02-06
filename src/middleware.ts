import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

import { routing } from '@/lib/locale';

import {
  globalGETRateLimit,
  globalPOSTRateLimit,
} from '@/server/api/rate-limit';

const BYPASS_PATHS = ['/s3/', '/api/'] as const;

const handleI18nRouting = createMiddleware(routing);

function shouldBypassI18n(pathname: string): boolean {
  return BYPASS_PATHS.some((path) => pathname.startsWith(path));
}

function handleI18nResponse(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassI18n(pathname)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export async function middleware(request: NextRequest) {
  if (request.method === 'GET') {
    if (!(await globalGETRateLimit())) {
      return NextResponse.redirect(
        new URL('/too-many-requests', process.env.NEXT_PUBLIC_SITE_URL),
      );
    }
    const response = handleI18nResponse(request);
    const token = request.cookies.get('session')?.value ?? null;
    if (token !== null) {
      response.cookies.set('session', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  }
  if (!(await globalPOSTRateLimit())) {
    return NextResponse.redirect(
      new URL('/too-many-requests', process.env.NEXT_PUBLIC_SITE_URL),
    );
  }
  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');
  if (originHeader === null || hostHeader === null) {
    return NextResponse.json(
      { error: 'Missing Origin or Host header' },
      { status: 403 },
    );
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return NextResponse.json(
      { error: 'Invalid Origin header' },
      { status: 403 },
    );
  }
  if (origin.host !== hostHeader) {
    return NextResponse.json(
      { error: 'Origin and Host headers do not match' },
      { status: 403 },
    );
  }
  return handleI18nResponse(request);
}

export const config = {
  matcher: ['/', '/(en|no)/:path*', '/((?!_next|.*\\..*).*)'],
};
