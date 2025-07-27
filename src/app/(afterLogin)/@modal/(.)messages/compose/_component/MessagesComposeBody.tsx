'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import CreateGroup from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/CreateGroup';
import { MessagesComposeContext } from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';
import { useContext, useEffect } from 'react';
import MessagesComposeResult from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/MessagesComposeResult';
import { usePathname } from 'next/navigation';

interface Props {
  sessionId: string;
}

export default function MessagesComposeBody({ sessionId }: Props) {
  const pathname = usePathname();
  const { search, getUsers, clearUsers } = useContext(MessagesComposeContext);
  const n = getUsers().length;

  useEffect(() => {
    return () => {
      clearUsers();
    };
  }, []);

  return (
    <div
      className={cx(
        utils.relative,
        utils.d_flexColumn,
        utils.flex_1,
        utils.bd_t_1_solid_gray,
        utils.of_auto
      )}
    >
      {search === '' && n === 0 && pathname === '/messages/compose' && (
        <CreateGroup />
      )}
      {search !== '' && <MessagesComposeResult sessionId={sessionId} />}
    </div>
  );
}
