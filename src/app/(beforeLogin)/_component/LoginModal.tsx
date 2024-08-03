'use client';

import style from '@/app/(beforeLogin)/_styles/login.module.css';
import BackButton from './BackButton';
import LoginButton from './LoginButton';
import cx from 'classnames';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { translateKorean } from '@/app/_lib/common';

export default function LoginModal() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessage('');
    setId(e.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessage('');
    setPassword(e.target.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!id || !id.trim()) {
      return setMessage('invalid_id');
    } else if (!password || !password.trim()) {
      return setMessage('invalid_password');
    }

    try {
      setLoading(true);
      const response = await signIn('credentials', {
        id,
        password,
        // callbackUrl: '/home',
        redirect: false,
      });
      setLoading(false);
      if (!response?.ok) {
        return setMessage('incorrect_id_password');
      }
      router.refresh();
      router.replace('/home');
    } catch (error) {
      console.error(error);
      setLoading(false);
      return setMessage('server_error');
    }
  };

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <BackButton />
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                type="text"
                placeholder=""
                value={id}
                onChange={onChangeId}
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                type="password"
                placeholder=""
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className={cx(style.message, message && style.show)}>
              {translateKorean(message)}
            </div>
          </div>
          <div className={style.modalFooter}>
            <LoginButton loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}
