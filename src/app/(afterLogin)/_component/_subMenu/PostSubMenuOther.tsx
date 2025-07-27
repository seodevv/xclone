'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
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
import { useContext } from 'react';

interface Props {
  post: AdvancedPost;
  width?: number;
}

export default function PostSubMenuOther({ post, width = 18.75 }: Props) {
  const { close } = useContext(SubMenuContext);

  const closeMenu = () => {
    close();
  };

  return (
    <SubMenuWrapper>
      <SubMenu
        type="div"
        title="Not interested in this post"
        svg={<NotInterestedSvg width={width} />}
      />
      <SubMenu
        type="div"
        title="Follow @seodevv"
        svg={<FollowSvg width={width} />}
      />
      <SubMenu
        type="div"
        title="Add/remove @seodevv from Lists"
        svg={<ListsSvg width={width} />}
      />
      <SubMenu
        type="div"
        title="Mute @seodevv"
        svg={<MuteSvg width={width} />}
      />
      <SubMenu
        type="div"
        title="Block @seodevv"
        svg={<BlockSvg width={width} />}
      />
      <SubMenu
        type="link"
        href={`/${post.userid}/status/${post.postid}/quotes`}
        title="View post engagements"
        svg={<ViewSvg width={width} />}
        onClick={closeMenu}
      />
      <SubMenu type="div" title="Embed post" svg={<EmbedSvg width={width} />} />
      <SubMenu
        type="div"
        title="Report post"
        svg={<ReportSvg width={width} />}
      />
      <SubMenu
        type="div"
        title="Request Community Note"
        svg={<AnnounceSvg width={width} />}
      />
    </SubMenuWrapper>
  );
}
