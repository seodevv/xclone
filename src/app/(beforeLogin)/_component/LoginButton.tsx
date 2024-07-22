'use client';

import style from '@/app/(beforeLogin)/_styles/login.module.css';
import { useFormStatus } from 'react-dom';

interface Props {
  text?: string;
  loading?: boolean;
}

export default function LoginButton({
  text = '로그인하기',
  loading = false,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button className={style.actionButton} disabled={pending || loading}>
      {pending || loading ? (
        <img src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/3-dots-fade-white-36.svg" />
      ) : (
        text
      )}
    </button>
  );
}
