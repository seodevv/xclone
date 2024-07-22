import styles from '@/app/(beforeLogin)/_styles/main.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footer_list}>
          <Link href="#">소개</Link>
          <Link href="#">X 앱 다운로드하기</Link>
          <Link href="#">고객센터</Link>
          <Link href="#">이용약관</Link>
          <Link href="#">개인정보 처리방침</Link>
          <Link href="#">쿠키 정책</Link>
          <Link href="#">접근성</Link>
          <Link href="#">광고 정보</Link>
          <Link href="#">블로그</Link>
          <Link href="#">채용</Link>
          <Link href="#">브랜드 리소스</Link>
          <Link href="#">광고</Link>
          <Link href="#">마케팅</Link>
          <Link href="#">비즈니스용 X</Link>
          <Link href="#">개발자</Link>
          <Link href="#">디렉터리</Link>
          <Link href="#">설정</Link>
          <span>© 2024 X Corp.</span>
        </div>
      </div>
    </>
  );
}
