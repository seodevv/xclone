'use client';

import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import styles from './singleLists.header.module.css';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import OptionSvg from '@/app/_svg/post/OptionSvg';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listId]/_hooks/useGetSingleListsQuery';

interface Props {
  listId: string;
}

export default function SingleListsHeader({ listId }: Props) {
  const { data: lists } = useGetSingleListsQuery(listId);

  const onClickShare = () => {};

  const onClickOption = () => {};

  if (lists) {
    return (
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
              <span>@{lists?.data.userId}</span>
            </div>
          </div>
          <div className={styles.options}>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={onClickShare}>
                <ShareSvg width={20} white />
              </button>
              <button className={styles.button} onClick={onClickOption}>
                <OptionSvg width={20} white />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className={styles.header}></div>;
}
