'use client';

import styles from './singleLists.header.module.css';
import { MouseEventHandler, useContext } from 'react';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listid]/_hooks/useGetSingleListsQuery';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import CustomButton from '@/app/(afterLogin)/_component/buttons/CustomButton';

interface Props {
  listid: string;
}

export default function SingleListsHeader({ listid }: Props) {
  const { data: lists } = useGetSingleListsQuery(listid);
  const { dispatchMenu } = useContext(SubMenuContext);

  const onClickShare: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: { type: 'lists_share' },
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!lists?.data) return;

    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: { type: 'lists_show', lists: lists.data },
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  if (lists) {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.inner}>
            <div className={styles.back}>
              <BackButton />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                <span>{lists?.data.name}</span>
              </div>
              <div className={styles.sub}>
                <span>@{lists?.data.userid}</span>
              </div>
            </div>
            <div className={styles.options}>
              <div className={styles.buttons}>
                <CustomButton
                  svg={<ShareSvg width={20} theme="theme" />}
                  onClick={onClickShare}
                />
                <OptionButton onClick={onClickOption} primary={false} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div className={styles.header}></div>;
}
