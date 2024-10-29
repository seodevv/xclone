import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (/^\/compose|^\/home|^\/explore|^\/messages|^\/search/.test(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // if (/^\/api\/auth\/session/.test(pathname)) {
  //   const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  //     ? '__Secure-next-auth.session-token'
  //     : 'next-auth.session-token';

  //   const userResponse = await fetch(`${process.env.SERVER_URL}/api/users`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       Cookie: cookies().toString(),
  //     },
  //   });
  //   if (!userResponse.ok) {
  //     return NextResponse.next();
  //   }

  //   const userInfo = (await userResponse.json()) as {
  //     data: AdvancedUser;
  //     message: string;
  //   };
  //   const res = NextResponse.next();

  //   const jwt = req.cookies.get(sessionCookie);
  //   if (!jwt) {
  //     return NextResponse.next();
  //   }
  //   const decoded = await decode({
  //     secret: process.env.NEXTAUTH_SECRET || 'secret',
  //     token: jwt.value,
  //   });
  //   const newToken = await encode({
  //     secret: process.env.NEXTAUTH_SECRET || 'secret',
  //     token: {
  //       ...decoded,
  //       picture: userInfo.data.image,
  //     },
  //     maxAge: 30 * 24 * 60 * 60,
  //   });
  //   res.cookies.set(sessionCookie, newToken);

  //   return res;
  // }
}

export const config = {
  matcher: ['/:path*'],
};
