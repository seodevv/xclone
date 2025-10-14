'use server';

import { AdvancedUser } from '@/model/User';
import { redirect } from 'next/navigation';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

const loginAction = async (
  prevState: { message: string },
  formData: FormData
) => {
  const id = formData.get('id');
  const password = formData.get('password');

  if (!id || typeof id !== 'string' || !id.trim()) {
    return { message: 'invalid_id' };
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    return { message: 'invalid_password' };
  }

  let isRedirect = false;
  try {
    const requestUrl = `/api/v1/login`;
    const options: RequestInit = {
      method: 'post',
      body: formData,
      credentials: 'include',
    };
    const response = await fetch(requestUrl, options);
    const responseBody = (await response.json()) as {
      data?: AdvancedUser;
      message: string;
    };

    if ([400, 500].includes(response.status)) {
      return { message: 'server_error' };
    } else if (response.status === 403) {
      return { message: 'incorrect_id_password' };
    }

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      const parsedCookie = parse(setCookie);
      if (typeof parsedCookie['connect.sid'] !== 'undefined') {
        cookies().set('connect.sid', parsedCookie['connect.sid'], {
          maxAge: 60 * 60 * 24,
          httpOnly: true,
          path: '/',
        });
        isRedirect = true;
      }
    }
  } catch (error) {
    console.error(error);
  }
  isRedirect && redirect('/home');
  return { message: 'server error' };
};

export default loginAction;
