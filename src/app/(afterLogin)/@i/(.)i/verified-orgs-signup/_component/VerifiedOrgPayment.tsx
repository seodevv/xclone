'use client';

import styles from './i.verifiedOrg.payment.module.css';
import cx from 'classnames';
import { useContext } from 'react';
import {
  VERIFIED_ORG_SIGNUP,
  VerifiedOrgContext,
} from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_provider/VerifiedOrgProvider';
import Link from 'next/link';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function VerifiedOrgPayment() {
  const { alterMessage } = useAlterModal();
  const { state, dispatch } = useContext(VerifiedOrgContext);
  const { price } = VERIFIED_ORG_SIGNUP[state.access];

  const selector: {
    id: 'annual' | 'monthly';
    save?: number;
    price: number;
  }[] = [
    {
      id: 'annual',
      save: Math.round((1 - price.sale / price.origin) * 100),
      price: price.sale,
    },
    { id: 'monthly', price: price.origin },
  ];

  const onClickPeriod = (id: 'annual' | 'monthly') => {
    dispatch({ type: 'setPeriod', payload: id });
  };

  return (
    <div className={styles.payment}>
      <div className={styles.period}>
        {selector.map((v) => (
          <div
            key={v.id}
            className={cx(
              styles.selector,
              state.period === v.id && styles.select
            )}
            onClick={() => onClickPeriod(v.id)}
          >
            <div className={styles.option}>
              {v.save && (
                <div className={styles.sale}>
                  <span>SAVE {v.save}%</span>
                </div>
              )}
              <div className={styles.per}>
                <span>
                  &#8361;{Math.round(v.price / 12).toLocaleString()} / month
                </span>
              </div>
              <div className={styles.sub}>
                {v.id === 'annual' ? (
                  <span>&#8361;{v.price.toLocaleString()} billed annually</span>
                ) : (
                  <span>Billed monthly</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bill}>
        <span>
          {state.access === 'basic' ? 'Basic' : 'Full Access'} is &#8361;
          {state.period === 'annual'
            ? price.sale.toLocaleString()
            : Math.round(price.origin / 12).toLocaleString()}
          /{state.period === 'annual' ? 'year' : 'month'} &#40;plus any
          applicable tax&#41;.
          {state.access === 'full' &&
            ` Each additional affiliated account is ₩${VERIFIED_ORG_SIGNUP.full.extra[
              state.period
            ].toLocaleString()} per handle per year (plus any applicable tax).`}
        </span>
        <Link
          href="https://help.x.com/ko/using-x/verified-organizations#verifiedorgs-pricing"
          target="_blank"
          className={styles.link}
        >
          Learn more
        </Link>
      </div>
      <div>
        <FlexButton
          text="Subscribe & Pay"
          style={{ margin: '16px 0' }}
          onClick={() => {
            alterMessage('This feature is in preparation.', 'warning');
          }}
        />
        <div className={styles.information}>
          <span>
            By clicking Subscribe, you agree to our{' '}
            <Link
              href="https://legal.x.com/ko/purchaser-terms"
              target="_blank"
              className={styles.service}
            >
              Purchaser Terms of Service
            </Link>
            . Subscriptions auto-renew until canceled. Accounts that sign up are
            reviewed for authenticity. If an account signs up and is not an
            organization, you will be rejected and not refunded.
          </span>
        </div>
      </div>
    </div>
  );
}
