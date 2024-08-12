'use client';
import styles from './beforeLogin.right.module.css';
import { signIn } from 'next-auth/react';
import cx from 'classnames';
import GithubSvg from '@/app/_svg/logo/GithubSvg';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function GithubLogin({ className, style }: Props) {
  const onClickGitHubLogin = async () => {
    await signIn('github', { callbackUrl: '/home' });
  };
  return (
    <>
      <button
        type="button"
        className={cx(styles.login, styles.github, className)}
        style={style}
        onClick={onClickGitHubLogin}
      >
        <GithubSvg white />
        <span>Sign up with Github</span>
      </button>
    </>
  );
}
