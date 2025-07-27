'use client';

import { useContext } from 'react';
import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import AnnounceSvg from '@/app/_svg/post/AnnounceSvg';
import ChatSvg from '@/app/_svg/post/ChatSvg';
import DeleteSvg from '@/app/_svg/post/DeleteSvg';
import EmbedSvg from '@/app/_svg/post/EmbedSvg';
import HighlightSvg from '@/app/_svg/post/HighlightSvg';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import PinedSvg from '@/app/_svg/post/PinedSvg';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import { AdvancedPost } from '@/model/Post';

interface Props {
  width?: number;
  post: AdvancedPost;
  sessionid: string;
}

export default function PostSubMenuSession({
  width = 18.75,
  post,
  sessionid,
}: Props) {
  const { sendPrepareMessage } = useAlterModal();
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const setPostId = useListsStore((state) => state.setPostId);

  const closeMenu = () => {
    close();
  };
  const onClickDelete = () => {
    dispatchMenu({
      type: 'set',
      payload: { status: { type: 'delete', post, sessionid } },
    });
  };
  const onClickPinned = () => {
    if (!post.pinned) {
      dispatchMenu({
        type: 'set',
        payload: { status: { type: 'highlight', post, sessionid } },
      });
    } else {
      dispatchMenu({
        type: 'set',
        payload: { status: { type: 'unPin', post, sessionid } },
      });
    }
  };
  const onClickAddMember = () => {
    setPostId(post.postid);
    closeMenu();
  };
  const onClickWhoCanReply = () => {
    dispatchMenu({
      type: 'set',
      payload: { status: { type: 'whoCanReply', post, sessionid } },
    });
  };
  const onClickEmbedPost = () => {
    sendPrepareMessage();
  };

  return (
    <>
      <SubMenuWrapper position="left">
        <SubMenu
          theme="red"
          type="div"
          title="Delete"
          svg={<DeleteSvg width={width} />}
          onClick={onClickDelete}
        />
        <SubMenu
          type="div"
          title={`${post.pinned ? 'UnPin' : 'Pin'} to your profile`}
          svg={<PinedSvg width={width} />}
          onClick={onClickPinned}
        />
        <SubMenu
          type="link"
          href="/i/verified-choose"
          title="Highlight on your profile"
          svg={<HighlightSvg width={width} />}
          onClick={closeMenu}
          scroll={false}
        />
        <SubMenu
          type="link"
          href="/i/lists/add_member"
          title={`Add/remove @${post.userid} from Lists`}
          svg={<ListsSvg width={width} />}
          scroll={false}
          onClick={onClickAddMember}
        />
        <SubMenu
          type="div"
          title="Change who can reply"
          svg={<ChatSvg width={width} />}
          onClick={onClickWhoCanReply}
        />
        <SubMenu
          type="link"
          href={`/${post.User.id}/status/${post.postid}/quotes`}
          title="View post engagements"
          svg={<ViewSvg width={width} />}
          onClick={closeMenu}
        />
        <SubMenu
          type="div"
          title="Embed post"
          svg={<EmbedSvg width={width} />}
          onClick={onClickEmbedPost}
        />
        <SubMenu
          type="div"
          title="View post analytics"
          svg={<ViewSvg width={width} />}
        />
        <SubMenu
          type="div"
          title="Request Community Note"
          svg={<AnnounceSvg width={width} />}
        />
      </SubMenuWrapper>
    </>
  );
}
