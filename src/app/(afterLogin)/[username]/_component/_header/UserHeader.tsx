'use client';

import styles from './userHeader.module.css';
import cx from 'classnames';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import UserHeaderTitle from './UserHeaderTitle';
import { useSelectedLayoutSegments } from 'next/navigation';
import ListsSearchBar from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchBar';
import { useSession } from 'next-auth/react';
import useMobileHeader from '@/app/_hooks/useMobileHeader';

interface Props {
  username: string;
}

export default function UserHeader({ username }: Props) {
  const { data: session } = useSession();
  const [a, b] = useSelectedLayoutSegments();
  const { dir, transitClass } = useMobileHeader();
  const isSearchHeader =
    a === 'lists' && b === undefined && session?.user?.email === username;

  if (a === 'topics') {
    return null;
  }

  return (
    <div
      className={cx(styles.header, transitClass, dir === 'down' && styles.hide)}
    >
      <BackButton prevPath="/home" />
      {isSearchHeader && <ListsSearchBar options />}
      <UserHeaderTitle username={username} />
    </div>
  );
}
