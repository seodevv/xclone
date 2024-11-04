import styles from './xLogoHeader.module.css';
import XLogoSvg from '@/app/_svg/logo/XLogoSvg';

interface Props {
  width?: number;
  fill?: string;
}

export default function XLogoHeader({ width = 32, fill }: Props) {
  return (
    <div className={styles.logo}>
      <XLogoSvg width={width} fill={fill} />
    </div>
  );
}
