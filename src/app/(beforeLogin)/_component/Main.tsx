import styles from '@/app/(beforeLogin)/_styles/main.module.css';
import Link from 'next/link';
import GoogleLogin from './GoogleLogin';
import Footer from './Footer';
import GithubLogin from './GithubLogin';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

export default async function Main() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <XLogoSvg className={styles.XLogo} />
        </div>
        <div className={styles.right}>
          <h1>지금 일어나고 있는 일</h1>
          <h2>지금 가입하세요.</h2>
          <div className={styles.buttons}>
            <GoogleLogin />
            <GithubLogin />
            <p className={styles.or}>또는</p>
            <Link href="/i/flow/signup" className={styles.signup}>
              계정 만들기
            </Link>
            <p className={styles.info}>
              가입하시려면
              <Link href="#">쿠키 사용</Link>을 포함해{' '}
              <Link href="#">이용약관</Link>과{' '}
              <Link href="#">개인정보 처리 방침</Link>을 동의해야 합니다.
            </p>
            <h3>이미 트위터에 가입하셨나요?</h3>
            <Link href="/login" className={styles.login}>
              로그인
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
