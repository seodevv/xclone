'use client';

import styles from './i.bookmarks.header.module.css';
import cx from 'classnames';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import utils from '@/app/utility.module.css';
import { Session } from 'next-auth';
import useMobileHeader from '@/app/_hooks/useMobileHeader';

interface Props {
  session: Session | null;
}

export default function BookmarkHeader({ session }: Props) {
  const { dir, transitClass } = useMobileHeader();

  if (!session) return null;

  return (
    <section
      className={cx(styles.header, transitClass, dir === 'down' && styles.hide)}
    >
      <div className={styles.inner}>
        <BackButton />
        <div className={styles.content}>
          <h2
            className={cx(
              utils.pt_2,
              utils.pb_2,
              utils.fs_xl,
              utils.fw_l,
              utils.cl_theme
            )}
          >
            Bookmarks
          </h2>
          <div className={cx(utils.fs_xs, utils.fw_s, utils.cl_temporary)}>
            <span>@{session.user?.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
