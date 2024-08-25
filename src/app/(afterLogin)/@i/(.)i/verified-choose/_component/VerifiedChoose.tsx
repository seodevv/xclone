'use client';

import { useState } from 'react';
import styles from './i.veirifedChoose.module.css';
import cx from 'classnames';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import Link from 'next/link';

export default function VerifiedChoose() {
  const [check, setCheck] = useState<'individual' | 'organization'>(
    'individual'
  );
  const radios = [
    {
      group: 'verified',
      id: 'individual' as const,
      type: 'Premium',
      title: 'I am an individual',
      sub: 'For individuals and creators',
    },
    {
      group: 'verified',
      id: 'organization' as const,
      type: 'Verified Organizations',
      title: 'I am an organization',
      sub: 'For businesses, government agencies, and non-profits',
    },
  ];

  const onClickType = (id: typeof check) => setCheck(id);
  const onClickSubmit = () => {};

  return (
    <div className={styles.verifiedChoose}>
      <div className={styles.whoAreYou}>
        <span>Who are you?</span>
      </div>
      <div className={styles.description}>
        <span>Choose the right subscription for you:</span>
      </div>
      <div className={styles.radioGroup}>
        {radios.map((r) => (
          <div
            key={r.id}
            className={cx(styles.radio, check === r.id && styles.radioActive)}
            onClick={() => onClickType(r.id)}
          >
            <div className={styles.radioContent}>
              <div className={styles.type}>
                <span>{r.type}</span>
              </div>
              <div className={styles.title}>
                <span>{r.title}</span>
              </div>
              <div className={styles.sub}>
                <span>{r.sub}</span>
              </div>
            </div>
            <input type="radio" name={r.group} hidden />
          </div>
        ))}
      </div>
      <FlexButton
        text="Subscribe"
        large
        style={{ margin: '32px 0 0 0' }}
        onClick={onClickSubmit}
      />
      <div className={styles.learn}>
        <span>
          Learn more about
          <Link
            href="https://help.x.com/ko/using-x/x-premium"
            target="_blank"
            className={styles.link}
          >
            Premium
          </Link>
          and
          <Link
            href="https://help.x.com/ko/using-x/verified-organizations"
            target="_blank"
            className={styles.link}
          >
            Verified Organizations
          </Link>
        </span>
      </div>
    </div>
  );
}
