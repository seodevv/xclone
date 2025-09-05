import style from '../layout.module.css';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import { Session } from 'next-auth';
import Link from 'next/link';

interface Props {
  session: Session | null;
}

export default function XLogo({ session }: Props) {
  return (
    <Link className={style.logo} href={session ? '/home' : '/'}>
      <div className={style.logoPill}>
        <XLogoSvg theme="theme" width={30} className={style.XLogo} />
      </div>
    </Link>
  );
}
