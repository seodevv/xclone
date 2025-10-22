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
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import useUnPostMutation from '@/app/(afterLogin)/_hooks/useUnPostMutation';
import usePostPinnedMutation from '@/app/(afterLogin)/_hooks/usePostPinnedMutation';

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
  const { alterMessage, sendPrepareMessage } = useAlterModal();
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const confirmStore = useConfirmStore(confirmSelector);
  const setPostId = useListsStore((state) => state.setPostId);

  const closeMenu = () => {
    close();
  };

  const unPostMutation = useUnPostMutation();
  const onClickDelete = () => {
    confirmStore.open({
      flag: true,
      title: 'Delete post?',
      sub: 'This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.',
      btnText: 'Delete',
      btnTheme: 'red',
      onClickCancle: () => {
        confirmStore.close();
        close();
      },
      onClickConfirm: () => {
        unPostMutation.mutate(
          {
            post,
          },
          {
            onSuccess: () => {
              alterMessage('Your post was deleted');
            },
            onError: (error) => {
              console.error(error);
              alterMessage('Failed to delete post.\nPlease try again', 'error');
            },
            onSettled: () => {
              confirmStore.close();
              close();
            },
          }
        );
      },
    });
  };

  const unPinMutation = usePostPinnedMutation();
  const onClickPinned = () => {
    if (!post.pinned) {
      dispatchMenu({
        type: 'set',
        payload: { status: { type: 'highlight', post, sessionid } },
      });
    } else {
      unPinMutation.mutate(
        {
          method: 'delete',
          postid: post.postid,
          sessionid,
        },
        {
          onSuccess: () => {
            alterMessage('Your post was unpinned from your profile');
          },
          onError: (error) => {
            console.error(error);
            alterMessage('Failed to unpin post.\nPlease try again', 'error');
          },
          onSettled: () => {
            close();
          },
        }
      );
    }
  };
  const onClickAddMember = () => {
    setPostId(post.postid);
    close();
  };
  const onClickWhoCanReply = () => {
    dispatchMenu({
      type: 'set',
      payload: { status: { type: 'whoCanReply', post, sessionid } },
    });
  };
  const onClickEmbedPost = () => {
    sendPrepareMessage();
    close();
  };
  const onClickRequestCommunityNote = () => {
    sendPrepareMessage();
    close();
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
          type="link"
          href={`/${post.userid}/status/${post.postid}/analytics`}
          title="View post analytics"
          svg={<ViewSvg width={width} />}
          onClick={closeMenu}
        />
        <SubMenu
          type="div"
          title="Request Community Note"
          svg={<AnnounceSvg width={width} />}
          onClick={onClickRequestCommunityNote}
        />
      </SubMenuWrapper>
    </>
  );
}
