import { useRouter } from 'next/navigation';
import styles from './beforeLogin.sign.module.css';

export default function NoAccount() {
  const router = useRouter();
  const onClickSignUp = () => {
    router.replace('/i/flow/signup?from=login', { scroll: false });
  };

  return (
    <div className={styles.noAccount}>
      <span>Don't have an account?</span>
      <button className={styles.signUp} type="button" onClick={onClickSignUp}>
        SignUp
      </button>
    </div>
  );
}
