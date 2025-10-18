'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import useFollowMutation from '@/app/(afterLogin)/_hooks/useFollowMutation';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useConfirmStore from '@/app/(afterLogin)/_store/ConfirmStore';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import AnnounceSvg from '@/app/_svg/post/AnnounceSvg';
import BlockSvg from '@/app/_svg/post/BlockSvg';
import EmbedSvg from '@/app/_svg/post/EmbedSvg';
import FollowSvg from '@/app/_svg/post/FollowSvg';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import MuteSvg from '@/app/_svg/post/MuteSvg';
import NotInterestedSvg from '@/app/_svg/post/NotInterestedSvg';
import ReportSvg from '@/app/_svg/post/ReportSvg';
import { AdvancedPost } from '@/model/Post';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

interface Props {
  post: AdvancedPost;
  width?: number;
}

export default function PostSubMenuOther({ post, width = 18.75 }: Props) {
  const { close, hide } = useContext(SubMenuContext);
  const { alterMessage, sendPrepareMessage } = useAlterModal();
  const { data: myProfile } = useMyProfileQuery();
  const isFollow = !!myProfile?.data.Followings.find(
    (u) => u.id === post.userid
  );

  const closeMenu = () => {
    close();
  };
  const prepare = () => {
    sendPrepareMessage();
    close();
  };

  const followMutation = useFollowMutation();
  const queryClient = useQueryClient();
  const onClickFollow = () => {
    if (typeof myProfile === 'undefined') return;

    followMutation.mutate(
      {
        queryClient,
        type: isFollow ? 'unfollow' : 'follow',
        sourceId: myProfile.data.id,
        targetId: post.userid,
      },
      {
        onError: (error) => {
          console.error(error);
          alterMessage('Follow failed. please try again', 'error');
        },
        onSuccess: () => {
          alterMessage(`you ${isFollow ? 'un' : ''}followed @${post.userid}`);
        },
        onSettled: () => {
          close();
        },
      }
    );
  };

  const setPostId = useListsStore((state) => state.setPostId);
  const onClickAddMember = () => {
    setPostId(post.postid);
    close();
  };

  const { open, close: closeConfirm } = useConfirmStore();
  const onClickBlock = () => {
    hide(true);
    open({
      flag: true,
      title: `Block @${post.userid}`,
      sub: `They will be able to see your public posts, but will no longer be able to engage with them. @${post.userid} will also not be able to follow or message you, and you will not see notifications from them. `,
      btnTheme: 'red',
      btnText: 'Block',
      onClickCancle: () => {
        closeConfirm();
        hide(false);
      },
      onClickConfirm: () => {
        sendPrepareMessage();
        closeConfirm();
        hide(false);
      },
    });
  };

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="div"
        title="Not interested in this post"
        svg={<NotInterestedSvg width={width} />}
        onClick={prepare}
      />
      <SubMenu
        type="div"
        title={`${isFollow ? 'Unfollow' : 'Follow'} @${post.userid}`}
        svg={<FollowSvg width={width} />}
        onClick={onClickFollow}
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
        title="Mute @seodevv"
        svg={<MuteSvg width={width} />}
        onClick={prepare}
      />
      <SubMenu
        type="div"
        title="Block @seodevv"
        svg={<BlockSvg width={width} />}
        onClick={onClickBlock}
      />
      <SubMenu
        type="link"
        href={`/${post.userid}/status/${post.postid}/quotes`}
        title="View post engagements"
        svg={<ViewSvg width={width} />}
        onClick={closeMenu}
      />
      <SubMenu
        type="div"
        title="Embed post"
        svg={<EmbedSvg width={width} />}
        onClick={prepare}
      />
      <SubMenu
        type="div"
        title="Report post"
        svg={<ReportSvg width={width} />}
        onClick={prepare}
      />
      <SubMenu
        type="div"
        title="Request Community Note"
        svg={<AnnounceSvg width={width} />}
        onClick={prepare}
      />
    </SubMenuWrapper>
  );
}
