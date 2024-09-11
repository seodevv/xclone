'use client';

import styles from './userHeader.module.css';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import UserHeaderTitle from './UserHeaderTitle';
import { useSelectedLayoutSegments } from 'next/navigation';
import ListsSearchBar from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchBar';

interface Props {
  username: string;
}

export default function UserHeader({ username }: Props) {
  const [a, b] = useSelectedLayoutSegments();
  const isSearchHeader = a === 'lists' && b === undefined;

  return (
    <div className={styles.header}>
      <BackButton prevPath="/home" />
      {isSearchHeader && <ListsSearchBar options />}
      <UserHeaderTitle username={username} />
    </div>
  );
}
