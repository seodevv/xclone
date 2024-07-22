'use server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import cookie from 'cookie';

export const settingCookies = (response: Response) => {
  const setCookie = response.headers.get('set-cookie');
  const options: Partial<ResponseCookie> = {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    path: '/',
  };
  if (setCookie) {
    const parse = cookie.parse(setCookie);
    cookies().set('connect.sid', parse['connect.sid'], options);
  }
};
