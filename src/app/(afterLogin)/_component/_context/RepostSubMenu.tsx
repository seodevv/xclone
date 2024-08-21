'use client';

import styles from './contextMenu.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  MouseEventHandler,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import EditSvg from '@/app/_svg/tweet/EditSvg';
import useReactionMutation from '@/app/(afterLogin)/_hooks/useReactionMutation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import SubMenu from '@/app/(afterLogin)/_component/_context/SubMenu';

export default function RepostSubMenu() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const reactionMutation = useReactionMutation();
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const [client, setClient] = useState({ width: 0, height: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const isReposted = menu.post?.Reposts.some(
    (u) => u.id === session?.user?.email
  );

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      dispatchMenu({ type: 'reset' });
    }
  };

  useLayoutEffect(() => {
    if (menuRef.current) {
      const { clientWidth, clientHeight } = menuRef.current;
      setClient({ width: clientWidth, height: clientHeight });
    }
  }, [setClient]);

  return (
    <div className={styles.background}>
      <div
        className={cx(utils.fixed, utils.t_r_b_l_0)}
        onClick={onClickOutSide}
      ></div>
      <div className={utils.relative}>
        <div
          className={cx(styles.context_menu, utils.absolute, utils.maxHeight)}
          style={{
            top: menu.position.y,
            left: menu.position.x - client.width / 2,
          }}
        >
          <div className={utils.relative}>
            <div ref={menuRef}>
              <SubMenu
                type="div"
                svg={<RepostSvg width={18.75} white />}
                title={isReposted ? 'Undo repost' : 'Repost'}
                onClick={() => {
                  if (
                    !menu.post ||
                    !session?.user?.email ||
                    !session.user.image ||
                    !session.user.name
                  ) {
                    return;
                  }

                  reactionMutation.mutate({
                    type: 'Reposts',
                    method: isReposted ? 'delete' : 'post',
                    post: menu.post,
                    session: {
                      email: session.user.email,
                      image: session.user.image,
                      name: session.user.name,
                    },
                    queryClient,
                  });
                  dispatchMenu({ type: 'reset' });
                }}
              />
              <SubMenu
                type="link"
                href="/compose/post"
                scroll={false}
                svg={<EditSvg width={18.75} white />}
                title="quote"
                onClick={() => {
                  dispatchMenu({ type: 'reset' });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
