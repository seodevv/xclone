'use client';

import styles from './i.premiumSignUp.subscribe.module.css';
import cx from 'classnames';
import { useContext } from 'react';
import { PremiumSignUpContext } from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';
import { captialCase } from '@/app/_lib/common';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import CheckSvg from '@/app/_svg/input/CheckSvg';

interface Subscribes {
  subscribe: 'basic' | 'premium' | 'premium+';
  price: { origin: number; sale: number };
  list: string[];
}

export default function SubsribeSelector() {
  const { state, dispatch } = useContext(PremiumSignUpContext);
  const { width } = useViewport();

  const subscribes: Subscribes[] = [
    {
      subscribe: 'basic',
      price: { origin: 46800, sale: 41524 },
      list: [
        'Small reply boost',
        'Encrypted direct messages',
        'Bookmark folders',
        'Highlights tab',
        'Edit post',
        'Post longer videos',
        'Longer posts',
      ],
    },
    {
      subscribe: 'premium',
      price: { origin: 124800, sale: 109000 },
      list: [
        'Half ads in for you and following',
        'Larger reply boost',
        'Get paid to post',
        'Checkmark',
        'Grok 2 AI Assistant',
        'X Pro, Analytics, Media Studio',
        'Creator Subscriptions',
      ],
    },
    {
      subscribe: 'premium+',
      price: { origin: 249600, sale: 218000 },
      list: ['Fully ad-free', 'Largest reply boost', 'Write Articles'],
    },
  ];

  const onClickSubscribe = (
    id: Subscribes['subscribe'],
    price: Subscribes['price']
  ) => {
    if (width < 704) return;
    dispatch({ type: 'setSubscribe', payload: { id, price } });
  };

  const onClickScribeBtn = (
    id: Subscribes['subscribe'],
    price: Subscribes['price']
  ) => {
    dispatch({ type: 'setSubscribe', payload: { id, price } });
    dispatch({ type: 'setFooter', payload: true });
  };

  return (
    <div className={styles.subscribe}>
      {subscribes.map((scribe, i) => {
        const isActive = state.subscribe.id === scribe.subscribe;
        const salesRate = scribe.price.sale / scribe.price.origin;
        const monthly =
          state.period === 'annual'
            ? (scribe.price.origin * salesRate) / 12
            : scribe.price.origin / 12;

        if (state.mode === 'verified' && scribe.subscribe === 'basic') {
          return null;
        }
        return (
          <div
            key={scribe.subscribe}
            className={cx(styles.button, isActive && styles.select)}
            onClick={() => onClickSubscribe(scribe.subscribe, scribe.price)}
          >
            <div className={styles.content}>
              <div className={styles.circle}>
                <div className={cx(styles.whether, isActive && styles.select)}>
                  {isActive && <CheckSvg width={20} theme="theme" />}
                </div>
              </div>
              <div className={styles.title}>
                <span>{captialCase(scribe.subscribe)}</span>
              </div>
              <div className={styles.type}>
                <div className={styles.recipe}>
                  <div className={styles.price}>
                    <span>&#8361;</span>
                    <span>{Math.round(monthly).toLocaleString()}</span>
                  </div>
                  <div className={styles.per}>/ month</div>
                </div>
                <div className={styles.period}>
                  {state.period === 'annual' ? (
                    <>
                      <span className={styles.full}>
                        &#8361;{scribe.price.sale.toLocaleString()} billed
                        annually
                      </span>
                      <span className={styles.small}>Billed annually</span>
                      <span className={styles.save}>
                        SAVE {Math.round((1 - salesRate) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span>Billed monthly</span>
                  )}
                </div>
                <FlexButton
                  className={styles.scribeBtn}
                  text="Subscribe"
                  onClick={() =>
                    onClickScribeBtn(scribe.subscribe, scribe.price)
                  }
                />
                <div className={styles.list}>
                  {i !== 0 && (
                    <div className={cx(styles.item, styles.addOn)}>
                      <span>
                        Everything in {captialCase(subscribes[i - 1].subscribe)}
                        , and
                      </span>
                    </div>
                  )}
                  {scribe.list.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <span>
                        <CheckSvg width={18.75} theme="theme" />
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
