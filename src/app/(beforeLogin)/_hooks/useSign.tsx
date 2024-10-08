import { AdvancedUser } from '@/model/User';
import { signIn } from 'next-auth/react';

const useSign = () => {
  const getAccount = async ({
    type,
    id,
    nickname,
  }: {
    type: 'login' | 'signup';
    id: string;
    nickname?: string;
  }): Promise<{ message: string }> => {
    const searchParams = new URLSearchParams();
    searchParams.set('type', type);
    searchParams.set('id', id);
    if (nickname) searchParams.set('nickname', nickname);

    const requestUrl = `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/api/login?${searchParams.toString()}`;
    const requestOption: RequestInit = {
      method: 'GET',
    };
    const response = await fetch(requestUrl, requestOption);
    if (type === 'login' && !response.ok) {
      throw new Error('not-found');
    }

    return response.json();
  };

  const login = async (id: string, password: string, redirect = false) => {
    const response = await signIn('credentials', {
      id,
      password,
      redirect: redirect,
      callbackUrl: redirect ? '/home' : undefined,
    });

    return response;
  };

  const signUp = async (
    formData: FormData
  ): Promise<{ data: AdvancedUser; message: string }> => {
    const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`;
    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch(requestUrl, requestOptions);
    if (!response.ok) {
      throw new Error('something is wrong');
    }

    return response.json();
  };

  return { getAccount, login, signUp };
};

export default useSign;
