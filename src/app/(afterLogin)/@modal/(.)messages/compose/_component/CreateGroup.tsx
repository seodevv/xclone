'use client';

import Text from '@/app/_component/_text/Text';
import styles from './messagesCompose.createGroup.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import AudienceSvg from '@/app/_svg/_settings/AudienceSvg';

export default function CreateGroup() {
  const router = useRouter();
  const onClickCreateGroup = () => {
    router.push('/messages/compose/group');
  };

  return (
    <div
      className={cx(
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.bd_b_1_solid_gray,
        utils.cursor_point,
        utils.transit_basic,
        styles.container
      )}
      onClick={onClickCreateGroup}
    >
      <div
        className={cx(
          utils.pa_2,
          utils.mr_11,
          utils.bg_trans,
          utils.br_50,
          styles.circle
        )}
      >
        <Text
          className={cx(
            utils.pa_8,
            utils.d_flexRow,
            utils.flex_alignCenter,
            utils.flex_justiCenter
          )}
          size="s"
          bold="bold"
          theme="primary"
        >
          <AudienceSvg width={17} style={{ fill: 'rgb(var(--primary-rgb))' }} />
        </Text>
      </div>
      <Text size="s" bold="bold" theme="primary">
        Create a group
      </Text>
    </div>
  );
}
