import styles from '../_style/i.flow.page.module.css';
import SignUpModalHeader from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpModalHeader';
import SignUpProvider from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpProvider';
import SignUpPhase from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpPhase';
import SignUpButton from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpButton';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import IFlowBackground from '@/app/i/flow/_components/IFlowBackground';

interface Props {
  searchParams: { from?: string; edit?: string };
}

export default function IFlowSignUpPage({ searchParams }: Props) {
  return (
    <SignUpProvider>
      <IFlowBackground from={searchParams.from}>
        <HtmlOverflowHidden />
        <div className={styles.inner}>
          <div className={styles.modal}>
            <SignUpModalHeader />
            <div className={styles.body}>
              <div className={styles.bodyFlex}>
                <SignUpPhase />
                <SignUpButton />
              </div>
            </div>
          </div>
        </div>
      </IFlowBackground>
    </SignUpProvider>
  );
}
