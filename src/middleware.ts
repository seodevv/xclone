import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/home/:path*',
    '/compose/:path*',
    '/explore/:path*',
    '/search/:path',
    '/messages/:path*',
    '/settings/:path*',
    '/i/bookmarks',
    '/i/verified-orgs-signup',
    '/i/premium_sign_up',
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const sid = req.cookies.get('access.token');

  if (!token || typeof sid === 'undefined') {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
