'use client';

import styles from './messages.left.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import MessagesBody from '@/app/(afterLogin)/messages/_component/_body/MessagesBody';
import MessagesHeader from '@/app/(afterLogin)/messages/_component/_header/MessagesHeader';
import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
  sessionid: string;
}

export default function MessagesLeftSection({ sessionid }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <section
      className={cx(
        utils.relative,
        utils.flex_1,
        utils.w_100p,
        utils.bd_r_1_solid_gray,
        utils.of_hide,
        styles.left,
        segment !== null && styles.visible
      )}
    >
      <MessagesHeader />
      <div
        className={cx(
          cx(
            utils.relative,
            utils.d_flexColumn,
            utils.flexGrow_1,
            utils.w_100p,
            utils.bg_trans
          )
        )}
      >
        <MessagesBody sessionId={sessionid} />
      </div>
    </section>
  );
}
