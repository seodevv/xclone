'use client';
import { useRouter } from 'next/navigation';
import style from '@/app/(beforeLogin)/_styles/signup.module.css';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';

export default function BackButton() {
  const router = useRouter();
  const onClickClose = () => router.back();

  return (
    <>
      <button className={style.closeButton} onClick={onClickClose}>
        <LeftArrowSvg width={24} />
      </button>
    </>
  );
}
