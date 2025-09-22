'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { encryptRoomId } from '@/app/_lib/common';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import ReferenceSvg from '@/app/_svg/profile/ReferenceSvg';
import { AdvancedPost } from '@/model/Post';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface Props {
  sessionid: string;
  post: AdvancedPost;
}

export default function PostShareSubMenu({ sessionid, post }: Props) {
  const router = useRouter();
  const { close } = useContext(SubMenuContext);
  const { alterMessage, sendPrepareMessage } = useAlterModal();

  const onClickCopyLink = () => {
    if (typeof window === 'undefined') return;

    const origin =
      window.location.origin ||
      window.location.protocol + '//' + window.location.host;
    const copy = `${origin}/${post.userid}/status/${post.postid}`;
    const clipboard = navigator.clipboard;

    if (clipboard) {
      clipboard.writeText(copy);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = copy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    close();
    alterMessage('Copied to clipboard');
  };

  const onClickShare = () => {
    if (
      typeof window === 'undefined' ||
      typeof navigator.share === 'undefined'
    ) {
      return;
    }

    const data: ShareData = {
      title: post.content,
      text: 'hi text',
      url: `/${post.userid}/status/${post.postid}`,
    };
    navigator.share(data);

    close();
  };

  const onClickDirectMessage = () => {
    if (sessionid === post.userid) {
      sendPrepareMessage();
    } else {
      const roomid = encryptRoomId(sessionid, post.userid);
      router.push(`/messages/${roomid}`);
    }
    close();
  };

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="div"
        svg={<ReferenceSvg width={18.75} white />}
        title="Copy link"
        onClick={onClickCopyLink}
      />
      <SubMenu
        type="div"
        svg={<ShareSvg width={18.75} theme="theme" />}
        title="Share post via ..."
        onClick={onClickShare}
      />
      <SubMenu
        type="div"
        svg={<MessageSvg width={18.75} theme="theme" />}
        title="Send via Direct Message"
        onClick={onClickDirectMessage}
      />
    </SubMenuWrapper>
  );
}
