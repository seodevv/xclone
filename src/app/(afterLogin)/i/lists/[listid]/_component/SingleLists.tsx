'use client';

import styles from './singleLists.module.css';
import cx from 'classnames';
import Image from 'next/image';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listid]/_hooks/useGetSingleListsQuery';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { generateImagePath, unitConversion } from '@/app/_lib/common';
import LockSvg from '@/app/_svg/profile/LockSvg';
import Link from 'next/link';
import { Session } from 'next-auth';
import { useState } from 'react';
import useListsFollowMutation from '@/app/(afterLogin)/@i/(.)i/lists/_hooks/useListsFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';

interface Props {
  session: Session;
  listid: string;
}

export default function SingleLists({ session, listid }: Props) {
  const {
    data: lists,
    isLoading,
    isError,
    error,
  } = useGetSingleListsQuery(listid);
  const queryClient = useQueryClient();
  const listsFollowMutation = useListsFollowMutation();
  const [hover, setHover] = useState(false);
  const { setLists, setSuggested } = useListsStore((state) => ({
    setLists: state.setLists,
    setSuggested: state.setSuggested,
  }));

  if (lists) {
    const isFollow =
      session.user?.email &&
      lists.data.Follower.map((f) => f.id).includes(session.user.email);

    const onClickFollow = () => {
      if (!session.user?.email) return;

      listsFollowMutation.mutate({
        queryClient,
        method: isFollow ? 'delete' : 'post',
        lists: lists.data,
        sessionid: session.user.email,
      });
    };

    return (
      <section className={styles.singleLists}>
        <div className={styles.relative}>
          <div className={styles.pad}></div>
          <div className={styles.absolute}>
            <Image
              className={styles.banner}
              src={generateImagePath(lists.data.banner)}
              alt={lists.data.name}
              width={600}
              height={200}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            <span>{lists.data.name}</span>
            {lists.data.make === 'private' && <LockSvg white active />}
          </div>
          <div className={styles.description}>
            {lists.data.description &&
              lists.data.description
                .split(/\r|\n|\r\n/)
                .map((text, i) => <span key={i}>{text}</span>)}
          </div>
          <div className={styles.user}>
            <Link
              className={styles.userLink}
              href={`/${lists.data.userid}`}
              scroll={false}
            >
              <div className={styles.userProfile}>
                <Image
                  src={generateImagePath(lists.data.User.image)}
                  alt={lists.data.User.id}
                  width={24}
                  height={24}
                />
              </div>
              <div className={styles.userNick}>
                <span>{lists.data.User.nickname}</span>
              </div>
              <div className={styles.useridentity}>
                <span>@{lists.data.User.id}</span>
              </div>
            </Link>
          </div>
          <div className={styles.counts}>
            <div className={styles.count}>
              <Link
                className={styles.countLink}
                href={`/i/lists/${lists.data.id}/members`}
                scroll={false}
                onClick={() => setSuggested(false)}
              >
                <div className={styles.countContent}>
                  <span>{unitConversion(lists.data.Member.length)}</span>
                  <span>&nbsp;Members</span>
                </div>
              </Link>
            </div>
            <div className={styles.count}>
              <Link
                className={styles.countLink}
                href={`/i/lists/${lists.data.id}/followers`}
                scroll={false}
              >
                <div className={styles.countContent}>
                  <span>{unitConversion(lists.data.Follower.length)}</span>
                  <span>&nbsp;Followers</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.actions}>
            {session.user?.email === lists.data.userid ? (
              <Link
                className={cx(styles.action, styles.edit)}
                href={`/i/lists/${lists.data.id}/info`}
                scroll={false}
                onClick={() => {
                  setLists(lists.data);
                }}
              >
                Edit List
              </Link>
            ) : (
              <button
                className={cx(
                  styles.action,
                  styles.follow,
                  isFollow && styles.following,
                  hover && styles.followingHover
                )}
                onMouseEnter={() => {
                  if (isFollow) setHover(true);
                }}
                onMouseLeave={() => {
                  if (isFollow) setHover(false);
                }}
                onClick={onClickFollow}
              >
                {isFollow ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    throw error;
  }

  return null;
}
