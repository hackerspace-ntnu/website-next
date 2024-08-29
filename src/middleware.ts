import { routing } from '@/lib/locale';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|no)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
