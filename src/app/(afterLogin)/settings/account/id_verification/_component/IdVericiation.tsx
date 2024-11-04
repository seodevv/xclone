import styles from './idVerification.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import BadgeSvg from '@/app/_svg/verified/BadgeSvg';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';

export default function IdVerification() {
  return (
    <div>
      <div className={utils.p_basic}>
        <div className={cx(utils.p_basic, styles.infor)}>
          <BadgeSvg className={styles.svg} type="blue" />
          <div className={styles.text}>
            <Text size="s">
              Want to have an ID verified label in your profile?
            </Text>
            <Link className={styles.premiumLink} href="/i/premium_sign_up">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>
      <div className={utils.p_basic}>
        <IdentifierCheckBox
          title="Hide your ID verified label"
          sub="Hide your ID verified label so people won’t see it when tapping the blue checkmark on your profile page."
          disable
        />
      </div>
      <SettingsSubMenu
        type="link"
        href="https://help.x.com/rules-and-policies/verification-policy"
        title="Help Center"
        external
      />
    </div>
  );
}
