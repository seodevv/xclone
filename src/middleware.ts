import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const requsetHeaders = new Headers(req.headers);
  // requsetHeaders.set('x-pathname', req.nextUrl.pathname);

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // return NextResponse.next({
  //   request: {
  //     headers: requsetHeaders,
  //   },
  // });
}

export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
