'use client';

import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import { MessagesComposeContext } from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { encryptRoomId } from '@/app/_lib/common';
import { SafeUser } from '@/model/User';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { MouseEventHandler, useContext } from 'react';

interface Props {
  session: SafeUser;
}

export default function MessagesComposeHeader({ session }: Props) {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const { getUsers } = useContext(MessagesComposeContext);
  const { alterMessage } = useAlterModal();

  const onClickNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const users = getUsers();

    if (users.length >= 2) {
      return alterMessage(
        `Group chat is a feature we're working on.`,
        'warning'
      );
    }

    const receiver = users[0];
    const roomid = encryptRoomId(session.id, receiver.id);
    router.replace(`/messages/${roomid}`);
  };

  return (
    <IHeader
      title={segment === 'group' ? 'Create a group' : 'New message'}
      sub={segment === 'group' ? 'Add people' : ''}
      align="left"
    >
      <TextButton
        theme="theme"
        text="Next"
        onClick={onClickNext}
        disabled={getUsers().length === 0}
      />
    </IHeader>
  );
}
