'use client';

import styles from './i.bookmarks.header.module.css';
import utils from '@/app/utility.module.css';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import cx from 'classnames';
import { Session } from 'next-auth';

interface Props {
  session: Session | null;
}

export default function BookmarkHeader({ session }: Props) {
  if (!session) return null;

  const onClickOption = () => {};

  return (
    <section className={styles.header}>
      <div className={styles.inner}>
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
        <div
          className={cx(
            utils.d_flexColumn,
            utils.flex_alignEnd,
            utils.flex_justiCenter,
            utils.w_min_56,
            utils.h_min_32
          )}
        >
          <OptionButton onClick={onClickOption} white />
        </div>
      </div>
    </section>
  );
}
