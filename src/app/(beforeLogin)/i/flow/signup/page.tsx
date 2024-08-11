import styles from './beforeLogin.signup.module.css';
import cx from 'classnames';
import SignUpModalHeader from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpModalHeader';
import SignUpProvider from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpProvider';
import SignUpPhase from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpPhase';
import SignUpButton from '@/app/(beforeLogin)/_component/_sign/_signup/SignUpButton';

interface Props {
  searchParams: { from?: string; edit?: string };
}

export default function IFlowSignUpPage({ searchParams }: Props) {
  return (
    <SignUpProvider>
      <section
        className={cx(styles.background, !searchParams.from && styles.fadeIn)}
      >
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
      </section>
    </SignUpProvider>
  );
}
