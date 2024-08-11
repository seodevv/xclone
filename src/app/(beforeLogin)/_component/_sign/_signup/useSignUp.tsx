'use client';

import { useContext } from 'react';
import {
  Options,
  Profile,
  SignUpContext,
} from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpProvider';
import useSign from '@/app/(beforeLogin)/_hooks/useSign';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { delay } from '@/app/_lib/common';
import { useRouter } from 'next/navigation';

export default function useSignUp() {
  const router = useRouter();
  const context = useContext(SignUpContext);
  const sign = useSign();
  const { alterMessage } = useAlterModal();
  const { id, nickname, birth, password, profile, options } = context;

  const disabled =
    options.state.page === 2
      ? profile.state.disabled || options.state.isLoading
      : options.state.page === 1
      ? password.state.disabled || options.state.isLoading
      : id.state.disabled ||
        nickname.state.disabled ||
        birth.state.disabled ||
        options.state.isLoading;

  const set = (state: A | B | C) => {
    context[state.type].setState((prev: any) => ({
      ...prev,
      ...state.payload,
    }));
  };
  const setFrom = () => {
    options.setState((prev) => ({ ...prev, from: true }));
  };
  const setLoading = (flag: boolean) => {
    options.setState((prev) => ({ ...prev, isLoading: flag }));
  };
  const setAnimated = (flag: boolean) => {
    options.setState((prev) => ({ ...prev, animated: flag }));
  };
  const setEdit = (flag: boolean) => {
    options.setState((prev) => ({ ...prev, edit: flag }));
  };
  const setPage = (type: 'prev' | 'next') => {
    options.setState((prev) => ({
      ...prev,
      prevPage: prev.page,
      page:
        type === 'prev'
          ? prev.page < 1
            ? 0
            : prev.page - 1
          : prev.page > 1
          ? 1
          : prev.page + 1,
    }));
  };
  const prevPage = () => {
    setPage('prev');
  };
  const nextPage = async () => {
    if (disabled) return;
    setLoading(true);
    switch (options.state.page) {
      case 0:
        try {
          const { id, nickname, password } = context;
          const { message } = await sign.getAccount({
            type: 'signup',
            id: id.state.value,
            nickname: nickname.state.value,
          });
          if (['id', 'nickname'].includes(message)) {
            const duplicatedId = message === 'id';
            alterMessage(
              `The ${duplicatedId ? 'name' : 'nickname'} is duplicated.`,
              'notice',
              3000
            );
            setLoading(false);
            setTimeout(
              () =>
                duplicatedId
                  ? id.state.ref?.current?.focus()
                  : nickname.state.ref?.current?.focus(),
              100
            );
          } else {
            setLoading(false);
            setAnimated(true);
            setPage('next');
            setTimeout(() => {
              password.state.ref?.current?.focus();
            }, 300);
          }
        } catch (error) {
          setLoading(false);
          alterMessage('Network Error. Please try again');
        }
        break;
      case 1:
        await delay(1000);
        setLoading(false);
        setPage('next');
        break;
      case 2:
        console.log('submit');
        const formData = new FormData();
        formData.append('id', id.state.value);
        formData.append('nickname', nickname.state.value);
        formData.append('birth', birth.state.value);
        formData.append('password', password.state.value);
        if (profile.state.value.file) {
          formData.append('image', profile.state.value.file);
        }

        try {
          await sign.signUp(formData);
          const response = await sign.login(
            id.state.value,
            password.state.value
          );
          if (response?.ok) {
            router.push('/home');
          } else {
            alterMessage('Login Failed. Please try again', 'error', 3000);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          alterMessage('Something is wrong. Please try again', 'error', 3000);
        }

        break;
      default:
        throw new Error('unknown page`s number');
    }
  };

  return {
    id: id.state,
    nickname: nickname.state,
    birth: birth.state,
    password: password.state,
    profile: profile.state,
    options: options.state,
    page: {
      prev: options.state.prevPage,
      current: options.state.page,
    },
    disabled,
    set,
    setFrom,
    setEdit,
    prevPage,
    nextPage,
  };
}

type A = {
  type: 'id' | 'nickname' | 'password' | 'birth';
  payload: {
    value?: string;
    disabled?: boolean;
  };
};
type B = {
  type: 'profile';
  payload: {
    value?: Partial<Profile>;
    disabled?: boolean;
  };
};

type C = {
  type: 'options';
  payload: Partial<Options>;
};
