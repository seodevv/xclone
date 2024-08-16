import styles from './beforeLogin.noAccount.module.css';
import { useRouter } from 'next/navigation';

export default function NoAccount() {
  const router = useRouter();
  const onClickSignUp = () => {
    router.replace('/i/flow/signup?from=login', { scroll: false });
  };

  return (
    <div className={styles.noAccount}>
      <span>Don&apos;t have an account?</span>
      <button className={styles.signUp} type="button" onClick={onClickSignUp}>
        SignUp
      </button>
    </div>
  );
}
