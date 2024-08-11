import styles from './userProfile.module.css';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';

interface Props {
  banner?: string;
}

export default function UserBanner({ banner }: Props) {
  return (
    <div className={styles.banner}>
      {banner && (
        <Image
          src={generateImagePath(banner)}
          alt=""
          width={600}
          height={200}
          className={styles.bannerImage}
        />
      )}
    </div>
  );
}
