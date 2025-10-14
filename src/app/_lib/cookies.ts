'use server';

import { cookies } from 'next/headers';

export const settingCookies = (response: Response) => {
  const cookiesFromRes = response.headers.getSetCookie?.() ?? [];
  const cookieStore = cookies();

  function isSameSite(str?: string): str is 'lax' | 'strict' | 'none' {
    return (
      typeof str !== 'undefined' && ['lax', 'strict', 'none'].includes(str)
    );
  }

  for (const cookie of cookiesFromRes) {
    const [nameValue, ...attrs] = cookie.split(';');
    const [name, value] = nameValue.split('=');

    cookieStore.set({
      name,
      value,
      httpOnly: attrs.some((a) => /httponly/i.test(a)),
      secure: attrs.some((a) => /secure/i.test(a)),
      path:
        attrs
          .find((a) => /path/i.test(a))
          ?.split('=')
          .at(1) || '/',
      sameSite:
        isSameSite(
          attrs
            .find((a) => /samesite/i.test(a))
            ?.split('=')
            .at(1)
        ) || 'none',
    });
  }
};
