import styles from '../_style/i.flow.page.module.css';
import LoginModalHeader from '@/app/(beforeLogin)/_component/_sign/_login/LoginModalHeader';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import IFlowBackground from '@/app/i/flow/_components/IFlowBackground';
import PasswordReset from '@/app/i/flow/password_reset/_component/PasswordReset';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password reset / XClone',
};

interface Props {
  searchParams: { from?: string };
}

export default function IFlowPasswordResetPage({ searchParams }: Props) {
  return (
    <IFlowBackground from={searchParams.from}>
      <HtmlOverflowHidden />
      <div className={styles.inner}>
        <div className={styles.modal}>
          <LoginModalHeader />
          <div className={styles.body}>
            <PasswordReset />
          </div>
        </div>
      </div>
    </IFlowBackground>
  );
}
