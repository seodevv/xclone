'use client';

import styles from './i.premiumSignUp.footer.module.css';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import Link from 'next/link';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { MouseEventHandler, useContext, useLayoutEffect, useRef } from 'react';
import { PremiumSignUpContext } from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

export default function PremiumFooter() {
  const { alterMessage } = useAlterModal();
  const { state, dispatch } = useContext(PremiumSignUpContext);
  const { width } = useViewport();
  const prevWidth = useRef(0);

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    if (width !== null && width > 704) return;
    if (e.currentTarget === e.target) {
      dispatch({ type: 'setFooter', payload: false });
    }
  };

  useLayoutEffect(() => {
    if (prevWidth.current <= 704 && width !== null && width > 704) {
      dispatch({ type: 'setFooter', payload: true });
    } else if (prevWidth.current > 704 && width !== null && width <= 704) {
      dispatch({ type: 'setFooter', payload: false });
    }
    return () => {
      if (width !== null) prevWidth.current = width;
    };
  }, [width]);

  return (
    <>
      {state.footer && (
        <div className={styles.background} onClick={onClickOutSide}>
          <div className={styles.footer}>
            <div className={styles.header}>
              <div className={styles.close}>
                <CloseButton
                  width={20}
                  noBack
                  onClick={() => {
                    dispatch({ type: 'setFooter', payload: false });
                  }}
                />
              </div>
              <div className={styles.grow}></div>
            </div>
            <div className={styles.inners}>
              <div className={styles.inner}>
                <div className={styles.kind}>
                  <span>Premium</span>
                </div>
                <div className={styles.order}>
                  <div className={styles.sheet}>
                    <div className={styles.price}>
                      <span>
                        &#8361;
                        {state.period === 'annual'
                          ? state.subscribe.price.sale.toLocaleString()
                          : Math.round(
                              state.subscribe.price.origin / 12
                            ).toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.per}>
                      <span>
                        / {state.period === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.billed}>
                  <div className={styles.annually}>
                    <span>
                      Billed{' '}
                      {state.period === 'annual' ? 'annually' : 'monthly'}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.inner}>
                <FlexButton
                  style={{ minHeight: '53px' }}
                  theme="primary"
                  text="Subscribe & Pay"
                  onClick={() =>
                    alterMessage('This feature is in preparation.', 'warning')
                  }
                />
                <div className={styles.information}>
                  <div>
                    <span>By subscribing, you agree to our</span>
                    <Link
                      href="https://legal.x.com/ko/purchaser-terms"
                      target="_blank"
                      className={styles.link}
                    >
                      Purchaser Terms of Service
                    </Link>
                    <span>
                      . Subscriptions auto-renew until canceled, as described in
                      the Terms.
                    </span>
                    <Link
                      href="https://legal.x.com/ko/purchaser-terms.html#cancelpremium"
                      target="_blank"
                      className={styles.link}
                    >
                      Cancel anytime
                    </Link>
                    <span>
                      . Cancel at least 24 hours prior to renewal to avoid
                      additional charges. A verified phone number is required to
                      subscribe. If you&apos;ve subscribed on another platform,
                      manage your subscription through that platform.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
