'use server';

import { cookies } from 'next/headers';

export const settingCookies = (response: Response) => {
  const cookiesFromRes = response.headers.getSetCookie?.() ?? [];
  const cookieStore = cookies();

  function isSameSite(str?: string): str is 'lax' | 'strict' | 'none' {
    return typeof str !== 'undefined' && /^(lax|strict|none)$/i.test(str);
  }

  for (const cookie of cookiesFromRes) {
    const [nameValue, ...attrs] = cookie.split(';');
    const [name, value] = nameValue.split('=');

    const maxAge = attrs
      .find((a) => /max-age/i.test(a))
      ?.split('=')
      .at(1);
    const sameSite = attrs
      .find((a) => /samesite/i.test(a))
      ?.split('=')
      .at(1);

    cookieStore.set({
      name,
      value,
      maxAge: maxAge && ~~maxAge !== 0 ? ~~maxAge : 60 * 60 * 24 * 30,
      httpOnly: attrs.some((a) => /httponly/i.test(a)),
      secure: attrs.some((a) => /secure/i.test(a)),
      path:
        attrs
          .find((a) => /path/i.test(a))
          ?.split('=')
          .at(1) || '/',
      sameSite: isSameSite(sameSite) ? sameSite : 'none',
      domain: attrs
        .find((a) => /domain/i.test(a))
        ?.split('=')
        .at(1),
    });
  }
};
