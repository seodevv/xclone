import styles from './i.premiumSignUp.page.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import PremiumSignUpProvider from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';
import PremiumTitle from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/PremiumTitle';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import PremiumFooter from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/PremiumFooter';
import PeriodSelector from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/PeriodSelector';
import SubsribeSelector from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/SubscribeSelector';
import PremiumInformation from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/_information/PremiumInformation';
import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creator Subscriptions / XClone',
};

export default function IPremiumSignUpSlot() {
  return (
    <PremiumSignUpProvider>
      <main className={cx(styles.background, utils.fadeIn)}>
        <AddHistoryStack />
        <HtmlOverflowHidden />
        <div className={styles.inner}>
          <div className={styles.body}>
            <div className={styles.gradient}></div>
            <div className={styles.content}>
              <PremiumTitle />
              <PeriodSelector />
              <SubsribeSelector />
              <PremiumInformation />
            </div>
            <div className={styles.close}>
              <CloseButton prevPath="/home" width={20} />
            </div>
            <PremiumFooter />
          </div>
        </div>
      </main>
    </PremiumSignUpProvider>
  );
}
