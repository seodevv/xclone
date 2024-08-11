import styles from './beforeLogin.loginPage.module.css';
import LoginModalHeader from '@/app/(beforeLogin)/_component/_sign/_login/LoginModalHeader';
import LoginModal from '@/app/(beforeLogin)/_component/_sign/LoginModal';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowLoginPage({ searchParams }: Props) {
  return (
    <main className={styles.background}>
      <div className={styles.inner}>
        <div className={styles.modal}>
          <LoginModalHeader />
          <div className={styles.middle}>
            <LoginModal />
          </div>
        </div>
      </div>
    </main>
  );
}
