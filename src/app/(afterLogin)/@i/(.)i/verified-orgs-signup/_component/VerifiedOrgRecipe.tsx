'use client';

import { useContext } from 'react';
import styles from './i.verifiedOrg.recipe.module.css';
import { VerifiedOrgContext } from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_provider/VerifiedOrgProvider';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import LockSvg from '@/app/_svg/profile/LockSvg';
import Link from 'next/link';

export default function VerifiedOrgRecipe() {
  const { state } = useContext(VerifiedOrgContext);

  const list = {
    basic: [
      { type: 'check', value: 'Gold checkmark' },
      { type: 'check', value: 'Priority support' },
      { type: 'check', value: 'Premium+' },
      { type: 'check', value: 'Hiring' },
      { type: 'lock', value: 'Incresed reach' },
      { type: 'lock', value: 'Affiliations' },
    ],
    full: [
      { type: 'check', value: 'Gold checkmark' },
      { type: 'check', value: 'Priority support' },
      { type: 'check', value: 'Premium+' },
      { type: 'check', value: 'Hiring' },
      { type: 'check', value: 'Incresed reach' },
      { type: 'check', value: 'Affiliations' },
    ],
  };

  return (
    <div className={styles.background}>
      <div className={styles.recipe}>
        <div className={styles.access}>
          <span>{state.access === 'basic' ? 'Basic' : 'Full Access'}</span>
        </div>
        <div className={styles.title}>
          <span>
            Grow faster on X, and get &#36;{state.credit.toLocaleString()} USD
            free ad credit
          </span>
        </div>
        <div className={styles.description}>
          <span>
            Reach more customers organically, affiliate your network, or find
            your next hire.
          </span>
        </div>
        {list[state.access].map((v) => (
          <div key={v.value} className={styles.list}>
            <span>
              {v.type === 'check' ? (
                <CheckSvg width={18.75} theme="theme" />
              ) : (
                <LockSvg width={18.75} />
              )}
            </span>
            <span>{v.value}</span>
          </div>
        ))}
        <div className={styles.plus}>
          <span>
            + For a limited time, a &#36;{state.credit.toLocaleString()} USD
            advertising credit to spend on your organization&nbsp;
            {state.access === 'full' && (
              <span className={styles.full}>or any of its affiliates </span>
            )}
            <span className={styles.highlight}>
              every {state.period === 'annual' ? 'year' : 'month'}
            </span>
            &nbsp;with dedicated support.
          </span>
          <Link
            className={styles.link}
            href="https://help.x.com/ko/using-x/verified-organizations/ads-terms"
            target="_blank"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
