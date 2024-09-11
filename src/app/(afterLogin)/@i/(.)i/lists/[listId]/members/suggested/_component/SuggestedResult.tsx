'use client';

import SuggestedMember from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_component/SuggestedMember';
import styles from './suggested.result.module.css';
import useGetSuggestedQuery from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_hooks/useGetSuggestedQuery';
import { SuggestedContext } from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_provider/SuggestedProvider';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import { useContext, useEffect, useRef, useState } from 'react';
import { AdvancedLists } from '@/model/Lists';

interface Props {
  lists: AdvancedLists;
}

export default function SuggestedResult({ lists }: Props) {
  const { search } = useContext(SuggestedContext);
  const { data: searchUserList, isFetching } = useGetSuggestedQuery({
    searchParams: { q: search },
    enabled: search !== '',
  });
  const [progress, setProgress] = useState({
    flag: false,
    value: 0,
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeout = 3000;

  useEffect(() => {
    if (search && isFetching) {
      const frame = 1000 / 60;
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const origin = prev.value * timeout;
          const next = (origin + frame) / timeout;
          if (next >= 1) return { flag: true, value: 1 };
          return { flag: true, value: next };
        });
      }, frame);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setProgress({ flag: false, value: 0 });
      }
    };
  }, [search, isFetching, setProgress]);

  if (search === '') {
    return (
      <NoPost
        title="Find suggested members"
        message="Try searching for accounts to see suggestions to add to this List."
      />
    );
  }

  return (
    <div className={styles.container}>
      <ProgressBar progress={progress} />
      {searchUserList?.pages.map((page) =>
        page.data.map((u) => (
          <SuggestedMember key={u.id} lists={lists} member={u} />
        ))
      )}
    </div>
  );
}

function ProgressBar({
  progress,
}: {
  progress: { flag: boolean; value: number };
}) {
  if (!progress.flag) return null;

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${progress.value * 100}%` }}
      ></div>
    </div>
  );
}
