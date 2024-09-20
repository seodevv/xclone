'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import TweetSvg from '@/app/_svg/navbar/TweetSvg';
import ReferenceSvg from '@/app/_svg/profile/ReferenceSvg';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function ListsShareSubMenu() {
  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const { dispatchMenu } = useContext(SubMenuContext);
  const setDefaultValue = useComposeStore((state) => state.setDefaultValue);

  const onClickPostList = () => {
    if (typeof window === 'undefined') return;

    const location = window.location.toString();
    setDefaultValue(location + ' ');
    router.push('/compose/post', { scroll: false });
    dispatchMenu({ type: 'reset' });
  };

  const onClickDirectMessage = () => {
    alterMessage('This feature is in preparation.', 'warning');
  };

  const onClickCopyLink = () => {
    const copy = window.location.toString();
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

    dispatchMenu({ type: 'reset' });
    alterMessage('Copied to clipboard');
  };

  const onClickShare = () => {
    if (typeof window === 'undefined') return;
    if (typeof navigator.share === 'undefined') {
      alterMessage('');
      return;
    }

    const data: ShareData = {
      url: '',
    };
    navigator.share(data);

    dispatchMenu({ type: 'reset' });
  };

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="div"
        svg={<TweetSvg width={18.75} white />}
        title="Post this"
        onClick={onClickPostList}
      />
      <SubMenu
        type="div"
        svg={<MessageSvg width={18.75} white />}
        title="Send via Direct Message"
        onClick={onClickDirectMessage}
      />
      <SubMenu
        type="div"
        svg={<ReferenceSvg width={18.75} white />}
        title="Copy link to List"
        onClick={onClickCopyLink}
      />
      <SubMenu
        type="div"
        svg={<ShareSvg width={18.75} white />}
        title="Share List"
        onClick={onClickShare}
      />
    </SubMenuWrapper>
  );
}
