'use client';

import Lists from '@/app/(afterLogin)/@i/(.)i/lists/_component/Lists';
import styles from './userLists.module.css';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { Session } from 'next-auth';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import useGetUserListsQuery from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_hooks/useGetUserListsQuery';
import { useRouter } from 'next/navigation';
import { AdvancedLists } from '@/model/Lists';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';

interface Props {
  session: Session | null;
  username: string;
  filter: 'all' | 'own' | 'memberships';
  pinned?: boolean;
}

export default function UserLists({
  session,
  username,
  filter,
  pinned = true,
}: Props) {
  const router = useRouter();
  const {
    data: lists,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = useGetUserListsQuery({ username, filter });

  const onClickLists = (listid: AdvancedLists['id']) => {
    router.push(`/i/lists/${listid}`);
  };

  if (lists) {
    if (lists.pages[0].data.length === 0) {
      return (
        <div className={styles.userLists}>
          <YourListsTitle
            session={session}
            username={username}
            filter={filter}
          />
          <NoLists username={username} filter={filter} />
        </div>
      );
    }

    return (
      <div className={styles.userLists}>
        <YourListsTitle session={session} username={username} filter={filter} />
        {lists.pages.map((page) =>
          page.data.map((l) => (
            <Lists
              key={l.id}
              lists={l}
              pinned={session?.user?.email === username ? pinned : false}
              onClick={() => onClickLists(l.id)}
            />
          ))
        )}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}

interface TitleProps {
  session: Props['session'];
  username: Props['username'];
  filter: Props['filter'];
}
function YourListsTitle({ session, username, filter }: TitleProps) {
  if (session?.user?.email !== username) return null;
  if (filter === 'memberships') return null;
  return (
    <div className={styles.yourLists}>
      <span>Your Lists</span>
    </div>
  );
}

interface NoListsProps {
  username: Props['username'];
  filter: Props['filter'];
}

function NoLists({ username, filter }: NoListsProps) {
  if (filter === 'memberships') {
    return (
      <NoPost
        title={`@${username} hasn't been added to any Lists`}
        message="When they’re added to a List, it’ll show up here."
      />
    );
  }

  return (
    <div className={styles.noLists}>
      <span>
        You haven&apos;t created or followed any Lists. When you do,
        they&apos;ll show up here.
      </span>
    </div>
  );
}
