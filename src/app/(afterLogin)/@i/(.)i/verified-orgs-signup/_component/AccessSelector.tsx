'use client';

import styles from './i.verifiedOrg.selector.module.css';
import IToggleSelector from '@/app/(afterLogin)/@i/(.)i/_component/IToggleSelector';
import { VerifiedOrgContext } from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_provider/VerifiedOrgProvider';
import { useContext } from 'react';

export default function AccessSelector() {
  const { state, dispatch } = useContext(VerifiedOrgContext);

  const selector: { id: typeof state.access; text: string }[] = [
    { id: 'basic', text: 'Basic' },
    { id: 'full', text: 'Full Access' },
  ];

  const onClickToggle = (id: typeof state.access) => {
    dispatch({ type: 'setAccess', payload: id });
    dispatch({ type: 'setCredit' });
  };

  return (
    <div className={styles.selector}>
      <div className={styles.range}>
        {selector.map((v) => (
          <IToggleSelector
            key={v.id}
            text={v.text}
            active={state.access === v.id}
            onClick={() => onClickToggle(v.id)}
          />
        ))}
      </div>
    </div>
  );
}
