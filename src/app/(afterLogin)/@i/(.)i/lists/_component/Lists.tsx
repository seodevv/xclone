'use client';

import styles from './iList.lists.module.css';
import cx from 'classnames';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import { AdvancedLists } from '@/model/Lists';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import Link from 'next/link';
import LockSvg from '@/app/_svg/profile/LockSvg';
import PinedSvg from '@/app/_svg/post/PinedSvg';
import useListsPinnedMutation from '@/app/(afterLogin)/@i/(.)i/lists/_hooks/useListsPinnedMutation';
import { MouseEventHandler } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import PlusSvg from '@/app/_svg/tweet/PlusSvg';
import { useSession } from 'next-auth/react';
import useListsFollowMutation from '@/app/(afterLogin)/@i/(.)i/lists/_hooks/useListsFollowMutation';

interface Props {
  lists: AdvancedLists;
  checked?: boolean;
  pinned?: boolean;
  follow?: boolean;
  onClick?: () => void;
}

export default function Lists({
  lists,
  checked,
  pinned,
  follow,
  onClick,
}: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const onClickLists = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  const listsPinnedMutation = useListsPinnedMutation();
  const onClickPinned: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    listsPinnedMutation.mutate({
      queryClient,
      method: lists.Pinned ? 'delete' : 'post',
      listid: lists.id,
      userid: lists.userid,
    });
  };

  const isFollow =
    session?.user?.email &&
    lists.Follower.map((f) => f.id).includes(session.user.email);
  const listsFollowMutation = useListsFollowMutation();
  const onClickFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.email) return;

    listsFollowMutation.mutate({
      queryClient,
      method: isFollow ? 'delete' : 'post',
      lists,
      sessionid: session.user.email,
    });
  };

  return (
    <div className={styles.lists} onClick={onClickLists}>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <div className={styles.imageBox}>
            <Image
              className={styles.image}
              src={generateImagePath(lists.thumbnail)}
              alt={lists.thumbnail}
              width={144}
              height={48}
            />
          </div>
        </div>
        <div className={styles.inform}>
          <div className={styles.title}>
            <div className={styles.name}>
              <span>{lists.name}</span>
            </div>
            {lists.make === 'private' && (
              <div className={styles.private}>
                <LockSvg white active />
              </div>
            )}
            {lists.Member.length !== 0 && (
              <div className={styles.member}>
                <span>ㆍ</span>
                <span>{lists.Member.length} members</span>
              </div>
            )}
          </div>
          <div className={styles.master}>
            <Link className={styles.link} href={`/${lists.User.id}`}>
              <div className={styles.profile}>
                <Image
                  className={styles.image}
                  src={generateImagePath(lists.User.image)}
                  alt={lists.User.image}
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles.nickname}>
                <span>{lists.User.nickname}</span>
              </div>
              <div className={styles.identity}>
                <span>@{lists.User.id}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {checked && (
        <div className={styles.checked}>
          <CheckSvg width={18.75} />
        </div>
      )}
      {pinned && (
        <button className={cx(styles.pinned)} onClick={onClickPinned}>
          <PinedSvg width={18.75} active={lists.Pinned} />
        </button>
      )}
      {follow && (
        <button
          className={cx(cx(styles.follow, isFollow && styles.isFollow))}
          onClick={onClickFollow}
        >
          {isFollow ? (
            <CheckSvg width={18} inherit />
          ) : (
            <PlusSvg width={18} inherit />
          )}
        </button>
      )}
    </div>
  );
}
