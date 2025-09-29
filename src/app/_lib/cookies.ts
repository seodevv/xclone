'use server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export const settingCookies = (response: Response) => {
  const setCookie = response.headers.get('set-cookie');
  const options: Partial<ResponseCookie> = {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    path: '/',
  };
  if (setCookie) {
    const parsedCookie = parse(setCookie);

    if (typeof parsedCookie['connect.sid'] !== 'undefined') {
      cookies().set('connect.sid', parsedCookie['connect.sid'], options);
    }
  }
};
