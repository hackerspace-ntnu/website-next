import { routing } from '@/lib/locale';
import { verifyRequestOrigin } from 'lucia';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method !== 'GET') {
    const originHeader = request.headers.get('Origin');
    const hostHeader = request.headers.get('Host');
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return new NextResponse(null, {
        status: 403,
      });
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(en|no)/:path*'],
};
