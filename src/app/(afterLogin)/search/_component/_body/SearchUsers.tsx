import styles from './searchBody.module.css';
import { useUserSearchQuery } from '../../_hook/useUserSearchQuery';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import Link from 'next/link';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchUsers({ searchParams }: Props) {
  const { data: searchUsers, isEmpty } = useUserSearchQuery({ searchParams });
  const isShort = typeof searchParams.f === 'undefined';
  const linkSearchParams = new URLSearchParams(searchParams);
  linkSearchParams.set('f', 'user');

  if (searchUsers && !isEmpty) {
    return (
      <>
        <div className={styles.people}>
          <span>People</span>
        </div>
        {searchUsers.pages.map((page, i) => {
          if (isShort && i > 0) return null;
          return page.data.map((u, i) => {
            if (isShort && i > 2) return null;
            return (
              <FollowRecommend
                key={u.id}
                style={{ paddingLeft: 16, paddingRight: 16 }}
                user={u}
                isDesc
              />
            );
          });
        })}
        {isShort && (
          <Link
            className={styles.viewAll}
            href={`/search?${linkSearchParams.toString()}`}
          >
            View all
          </Link>
        )}
      </>
    );
  }

  return null;
}
