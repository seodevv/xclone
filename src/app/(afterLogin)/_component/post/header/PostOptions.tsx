'use client';

import styles from './postHeader.module.css';
import cx from 'classnames';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import { Mode } from '@/app/(afterLogin)/_component/post/Post';
import { MouseEventHandler, useContext } from 'react';
import { AdvancedPost } from '@/model/Post';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

interface Props {
  mode?: Mode;
  post: AdvancedPost;
}

export default function PostOptions({ mode, post }: Props) {
  const { dispatchMenu } = useContext(SubMenuContext);

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: 'post',
        position: {
          x,
          y: y + window.scrollY,
          width,
          height,
          target: e.currentTarget,
        },
        post,
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
