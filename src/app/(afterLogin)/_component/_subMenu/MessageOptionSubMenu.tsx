'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useMessagesStore from '@/app/(afterLogin)/_store/MessagesStore';
import useMessagesMutation from '@/app/(afterLogin)/messages/[room]/_hooks/useMessagesMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import CopySvg from '@/app/_svg/post/CopySvg';
import DeleteSvg from '@/app/_svg/post/DeleteSvg';
import ReplySvg from '@/app/_svg/post/ReplySvg';
import { AdvancedMessages } from '@/model/Message';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface Props {
  message: AdvancedMessages;
}

export default function MessageOptionSubMenu({ message }: Props) {
  const confirm = useContext(ConfirmContext);
  const subMenu = useContext(SubMenuContext);
  const { setReply } = useMessagesStore();
  const { alterMessage } = useAlterModal();
  const width = 18.75;

  const onClickReply = () => {
    subMenu.close();
    setReply(message);
  };
  const onClickCopy = () => {
    subMenu.close();
    navigator.clipboard.writeText(message.content);
    alterMessage('Copied to clipboard');
  };

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();
  const mutation = useMessagesMutation();
  const onClickDelete = () => {
    subMenu.hide(true);
    confirm.dispatchModal({
      type: 'setCustom',
      payload: {
        title: 'Delete message?',
        sub: 'This message will be deleted for you. Other people in the conversation will still be able to see it.',
        btnText: 'Delete',
        btnTheme: 'red',
        onClickConfirm: () => {
          if (
            !session?.user?.email ||
            !session.user.name ||
            !session.user.image
          ) {
            router.push('/login');
            return;
          }
          mutation.mutate(
            {
              queryClient,
              payload: {
                type: 'disable',
                messageid: message.id,
                roomid: message.roomid,
                session: {
                  id: session.user.email,
                  nickname: session.user.name,
                  image: session.user.image,
                },
              },
            },
            {
              onSuccess: () => {},
              onError: () => {
                alterMessage('Something is wrong.\nPlease try again', 'error');
              },
              onSettled: () => {
                confirm.close();
                subMenu.close();
              },
            }
          );
        },
        onClickCancle: () => {
          confirm.close();
          subMenu.close();
        },
      },
    });
  };

  return (
    <SubMenuWrapper position="right">
      <SubMenu
        type="div"
        svg={<ReplySvg width={width} theme="white" />}
        title="Reply"
        onClick={onClickReply}
      />
      <SubMenu
        type="div"
        svg={<CopySvg width={width} theme="white" />}
        title="Copy message"
        onClick={onClickCopy}
      />
      <SubMenu
        type="div"
        svg={<DeleteSvg width={width} />}
        title="Delete for you"
        onClick={onClickDelete}
      />
    </SubMenuWrapper>
  );
}
