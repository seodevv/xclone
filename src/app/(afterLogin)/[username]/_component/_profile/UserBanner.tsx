import styles from './userBanner.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import Link from 'next/link';

interface Props {
  username: string;
  banner?: string;
}

export default function UserBanner({ username, banner }: Props) {
  return (
    <UserBannerWrapper username={username} banner={banner}>
      <div className={styles.pad}></div>
      <div className={cx(styles.absolute, styles.imageBox)}>
        {banner && (
          <Image
            className={styles.image}
            src={generateImagePath(banner)}
            alt=""
            width={600}
            height={200}
          />
        )}
      </div>
    </UserBannerWrapper>
  );
}

function UserBannerWrapper({
  username,
  banner,
  children,
}: {
  username: string;
  banner?: string;
  children: React.ReactNode;
}) {
  if (typeof banner !== 'undefined') {
    return (
      <Link
        className={styles.banner}
        href={`/${username}/header_photo`}
        scroll={false}
      >
        {children}
      </Link>
    );
  }
  return <div className={styles.banner}>{children}</div>;
}
