'use client';

import styles from './postHeader.module.css';
import cx from 'classnames';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import { MouseEventHandler, useContext } from 'react';
import { AdvancedPost } from '@/model/Post';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { useSession } from 'next-auth/react';

interface Props {
  mode?: Mode;
  post: AdvancedPost;
}

export default function PostOptions({ mode, post }: Props) {
  const { dispatchMenu } = useContext(SubMenuContext);
  const { data: session } = useSession();

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) return;

    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: { type: 'post', post, sessionid: session.user.email },
        position: {
          x,
          y: y + window.scrollY,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  if (mode === 'compose') return null;
  return (
    <div className={cx(styles.postOptions)}>
      <OptionButton onClick={onClickOption} />
    </div>
  );
}
