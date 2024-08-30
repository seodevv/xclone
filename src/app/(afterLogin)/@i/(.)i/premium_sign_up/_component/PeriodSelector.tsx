'use client';

import styles from './i.premiumSignup.period.module.css';
import { useContext } from 'react';
import { PremiumSignUpContext } from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';
import IToggleSelector from '@/app/(afterLogin)/@i/(.)i/_component/IToggleSelector';

export default function PeriodSelector() {
  const { state, dispatch } = useContext(PremiumSignUpContext);

  const selector: { period: 'annual' | 'monthly'; best?: boolean }[] = [
    { period: 'annual', best: true },
    { period: 'monthly' },
  ];
  const onClickSubscribe = (period: 'annual' | 'monthly') => {
    dispatch({ type: 'setPeriod', payload: period });
  };

  return (
    <div className={styles.range}>
      {selector.map(({ period, best }) => (
        <IToggleSelector
          key={period}
          text={period}
          active={state.period === period}
          best={best}
          onClick={() => onClickSubscribe(period)}
        />
      ))}
    </div>
  );
}
