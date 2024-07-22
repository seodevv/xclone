'use client';

import style from '@/app/(beforeLogin)/_styles/signup.module.css';
import BackButton from './BackButton';
import LoginButton from './LoginButton';
import cx from 'classnames';
import { translateKorean } from '@/app/_lib/common';
import { useFormState } from 'react-dom';
import signupAction from '../_lib/signupAction';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignupModal() {
  const [state, onSubmit] = useFormState(signupAction, { message: '' });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImage(
      e.target.files ? (e.target.files[0] ? e.target.files[0].name : '') : ''
    );
  };

  useEffect(() => {
    const login = async (id: string, password: string) => {
      setLoading(true);
      await signIn('credentials', { id, password, callbackUrl: '/home' });
      setLoading(false);
    };
    if (state.user) {
      login(state.user.id, state.user.password);
    }
  }, [state]);

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <h4>계정을 생성하세요.</h4>
          </div>
          <form action={onSubmit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="nickname">
                  닉네임
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  className={style.input}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <span className={cx(style.input, !image && style.placeholder)}>
                  {image ? image : '프로필을 업로드해주세요.'}
                </span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onChangeImage}
                />
              </div>
              <div className={cx(style.message, state.message && style.show)}>
                {translateKorean(state.message)}
              </div>
            </div>
            <div className={style.modalFooter}>
              <LoginButton text="가입하기" loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
