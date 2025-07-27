'use client';

import styles from './messagesCompose.users.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { MessagesComposeContext } from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';
import { useContext } from 'react';
import { AdvancedUser } from '@/model/User';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import Text from '@/app/_component/_text/Text';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

export default function MessagesComposeUsers() {
  const { getUsers } = useContext(MessagesComposeContext);
  const users = getUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className={cx(utils.pa_4, utils.d_flexRow, utils.flexWrap)}>
      {users.map((user) => (
        <SelectedUser key={user.id} user={user} />
      ))}
    </div>
  );
}

function SelectedUser({ user }: { user: AdvancedUser }) {
  const { removeUsers } = useContext(MessagesComposeContext);

  return (
    <div
      className={cx(
        utils.ma_4,
        utils.d_flexRow,
        utils.bg_theme,
        utils.bd_1_solid_gray,
        utils.br_9999,
        utils.of_hide,
        styles.selectedUser
      )}
    >
      <button
        className={cx(
          utils.pl_3,
          utils.pr_12,
          utils.d_flexRow,
          utils.flexGrow_1,
          utils.flex_alignCenter,
          utils.bg_trans,
          utils.bd_none,
          utils.transit_basic,
          utils.cursor_point,
          styles.selectButton
        )}
        onClick={() => {
          removeUsers(user.id);
        }}
      >
        <div
          className={cx(
            utils.mr_8,
            utils.d_flexRow,
            utils.flex_justiCenter,
            styles.profile
          )}
        >
          <div className={cx(utils.relative, utils.w_100p, utils.h_100p)}>
            <div className={cx(utils.pb_100, utils.w_100p)}></div>
            <div
              className={cx(
                utils.absolute,
                utils.t_r_b_l_0,
                utils.w_100p,
                utils.h_100p
              )}
            >
              <Image
                className={cx(utils.w_100p, utils.h_100p, utils.br_50)}
                src={generateImagePath(user.image)}
                alt={user.image}
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
        <div>
          <Text text={user.id} bold={'bold'} />
        </div>
        <div>
          <XMarkSvg
            width={18.75}
            className={utils.ml_12}
            style={{ fill: 'rgb(29,155,240)' }}
          />
        </div>
      </button>
    </div>
  );
}
