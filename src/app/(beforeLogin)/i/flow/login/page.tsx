import styles from '../_style/beforeLogin.i.flow.page.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import LoginModalHeader from '@/app/(beforeLogin)/_component/_sign/_login/LoginModalHeader';
import LoginPhase from '@/app/(beforeLogin)/_component/_sign/_login/LoginPhase';
import LoginProvider from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowLoginPage({ searchParams }: Props) {
  return (
    <LoginProvider>
      <main
        className={cx(styles.background, !searchParams.from && utils.fadeIn)}
      >
        <HtmlOverflowHidden />
        <div className={styles.inner}>
          <div className={styles.modal}>
            <LoginModalHeader />
            <div className={styles.body}>
              <LoginPhase />
            </div>
          </div>
        </div>
      </main>
    </LoginProvider>
  );
}
