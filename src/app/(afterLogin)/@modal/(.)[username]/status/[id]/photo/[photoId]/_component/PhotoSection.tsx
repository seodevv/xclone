'use client';

import ActionButtons from '@/app/(afterLogin)/_component/post/ActionButtons';
import styles from '../_style/photoModal.module.css';
import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';

interface Props {
  id: string;
}

export default function PhotoSection({ id }: Props) {
  const { data: post } = useSinglePostQuery(id);

  return (
    <section className={styles.photoSection}>
      <div className={styles.imageSection}></div>
      <div className={styles.reactionSection}>
        <div className={styles.reaction}>
          <ActionButtons post={post.data} width={22.5} white />
        </div>
      </div>
    </section>
  );
}
