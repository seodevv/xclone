'use client';

import styles from './userPhoto.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import { generateImagePath } from '@/app/_lib/common';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  mode: 'image' | 'banner';
  username: string;
}

export default function UserPhoto({ mode, username }: Props) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUserQuery(username);

  if (user) {
    const src = mode === 'image' ? user.data.image : user.data.banner;
    if (!src) return null;

    return (
      <div className={styles.container}>
        <div className={cx(styles.content, mode === 'banner' && styles.banner)}>
          <div className={styles.pad}></div>
          <div className={styles.absolute}>
            <Image
              className={styles.image}
              src={generateImagePath(src)}
              alt={src}
              width={400}
              height={400}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    router.replace(`/${username}`);
  }

  return null;
}
