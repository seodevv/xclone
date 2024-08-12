'use client';

import styles from './beforeLogin.signup.module.css';
import { useRouter } from 'next/navigation';

export default function AlreadyAccount() {
  const router = useRouter();

  const onClick = () => {
    router.replace('/i/flow/login?from=signup', { scroll: false });
  };

  return (
    <div className={styles.alreadyAccount}>
      <button className={styles.alreadyBtn} type="button" onClick={onClick}>
        Already have an account?
      </button>
    </div>
  );
}
