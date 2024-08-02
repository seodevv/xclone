'use client';

import styles from './searchFilter.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RadioButton from '../buttons/RadioButton';
import Link from 'next/link';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groups = [
    {
      title: 'People',
      filter: [
        { text: 'From anyone', key: 'pf' },
        { text: 'People you follow', key: 'pf', value: 'on' },
      ],
    },
    {
      title: 'Location',
      filter: [
        { text: 'Anywhere', key: 'lf' },
        { text: 'Near you', key: 'lf', value: 'on' },
      ],
    },
  ];

  const filterHandler = (key: string, value?: string) => {
    const writableSearchParams = new URLSearchParams(searchParams);
    if (value) {
      writableSearchParams.set(key, value);
    } else {
      writableSearchParams.delete(key);
    }
    router.replace(`/search?${writableSearchParams.toString()}`);
  };

  if (pathname !== '/search') return null;

  return (
    <section className={styles.main}>
      <h5 className={styles.title}>Search filters</h5>
      <div className={styles.section}>
        <div className={styles.groups}>
          {groups.map((group, i) => (
            <div key={i}>
              <label className={styles.group}>{group.title}</label>
              {group.filter.map((v, i) => {
                const id = `${v.key}-${i}`;
                const pf = searchParams.get(v.key);
                const func = () => filterHandler(v.key, v.value);
                return (
                  <label
                    key={id}
                    className={styles.radio}
                    htmlFor={id}
                    onClick={func}
                  >
                    <div className={styles.text}>{v.text}</div>
                    <div className={styles.btn}>
                      <RadioButton isChecked={v.value ? !!pf : !pf} />
                    </div>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.advanced}>
          <Link href={'/search-advanced'}>Advanced search</Link>
        </div>
      </div>
    </section>
  );
}
