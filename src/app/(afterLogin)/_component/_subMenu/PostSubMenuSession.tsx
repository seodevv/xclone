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
import { usePathname } from 'next/navigation';

interface Props {
  width?: number;
}

export default function PostSubMenuSession({ width = 18.75 }: Props) {
  const pathname = usePathname();
  const { alterMessage } = useAlterModal();
  const {
    menu: { post },
    dispatchMenu,
  } = useContext(SubMenuContext);
  const setPostId = useListsStore((state) => state.setPostId);

  const closeMenu = () => {
    dispatchMenu({ type: 'reset' });
  };

  if (!post) return null;

  return (
    <>
      <SubMenuWrapper position="left">
        <SubMenu
          theme="red"
          type="div"
          title="Delete"
          svg={<DeleteSvg width={width} />}
          onClick={() =>
            dispatchMenu({ type: 'set', payload: { status: 'delete' } })
          }
        />
        <SubMenu
          type="div"
          title={`${post.pinned ? 'UnPin' : 'Pin'} to your profile`}
          svg={<PinedSvg width={width} />}
          onClick={() => {
            if (!post.pinned) {
              dispatchMenu({ type: 'set', payload: { status: 'highlight' } });
            } else {
              dispatchMenu({ type: 'set', payload: { status: 'unPin' } });
            }
          }}
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
          title={`Add/remove @${post?.User.id} from Lists`}
          svg={<ListsSvg width={width} />}
          scroll={false}
          onClick={() => {
            setPostId(post.postId);
            closeMenu();
          }}
        />
        <SubMenu
          type="div"
          title="Change who can reply"
          svg={<ChatSvg width={width} />}
          onClick={() =>
            dispatchMenu({
              type: 'set',
              payload: { status: 'whoCanReply' },
            })
          }
        />
        <SubMenu
          type="link"
          href={`/${post.User.id}/status/${post.postId}/quotes`}
          title="View post engagements"
          svg={<ViewSvg width={width} />}
          onClick={closeMenu}
        />
        <SubMenu
          type="div"
          title="Embed post"
          svg={<EmbedSvg width={width} />}
          onClick={() =>
            alterMessage('This feature is in preparation.', 'warning')
          }
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
