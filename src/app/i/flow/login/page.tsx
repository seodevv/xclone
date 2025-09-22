import styles from '../_style/i.flow.page.module.css';
import LoginModalHeader from '@/app/(beforeLogin)/_component/_sign/_login/LoginModalHeader';
import LoginPhase from '@/app/(beforeLogin)/_component/_sign/_login/LoginPhase';
import LoginProvider from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import IFlowBackground from '@/app/i/flow/_components/IFlowBackground';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowLoginPage({ searchParams }: Props) {
  return (
    <LoginProvider>
      <IFlowBackground from={searchParams.from}>
        <HtmlOverflowHidden />
        <div className={styles.inner}>
          <div className={styles.modal}>
            <LoginModalHeader />
            <div className={styles.body}>
              <LoginPhase />
            </div>
          </div>
        </div>
      </IFlowBackground>
    </LoginProvider>
  );
}
