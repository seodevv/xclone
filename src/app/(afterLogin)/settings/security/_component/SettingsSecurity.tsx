import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import Link from 'next/link';
import DivideLine from '@/app/_component/_util/DivideLine';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import { Dispatch, SetStateAction } from 'react';
import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';

interface Props {
  onCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
  onUnCheck?: (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => void;
}

export default function SettingsSecurity({ onCheck, onUnCheck }: Props) {
  const passProtection = useSettingsLocalStore((state) => state.passProtection);
  return (
    <div>
      <div>
        <Text className={utils.p_basic} size="xl" bold="bold">
          Two-factor authentication
        </Text>
        <SettingsSubMenu
          type="link"
          href="/settings/account/login_verification"
          title="Two-factor authentication"
        />
        <Text className={utils.p_basic} size="xs" theme="gray">
          Help protect your account from unauthorized access by requiring a
          second authentication method in addition to your X password. You can
          choose a text message, authentication app, or security key.&nbsp;
          <Link
            className={utils.link}
            href="https://help.x.com/managing-your-account/two-factor-authentication"
            target="_blank"
          >
            Learn more
          </Link>
        </Text>
      </div>
      <div>
        <DivideLine />
        <Text className={utils.p_basic} size="xl" bold="bold">
          ID verification
        </Text>
        <SettingsSubMenu
          type="link"
          href="/settings/account/id_verification"
          title="ID verification"
        />
        <Text className={utils.p_basic} size="xs" theme="gray">
          Upload an approved form of identification to confirm the authenticity
          of your account. Your information will only be used to validate your
          identity and will be handled safely and securely.&nbsp;
          <Link
            className={utils.link}
            href="https://help.x.com/rules-and-policies/verification-policy"
            target="_blank"
          >
            Learn more
          </Link>
        </Text>
      </div>
      <div>
        <DivideLine />
        <Text className={utils.p_basic} size="xl" bold="bold">
          Additional password protection
        </Text>
        <div className={utils.p_basic}>
          <IdentifierCheckBox
            title="Password reset protect"
            defaultValue={passProtection}
            onCheck={onCheck}
            onUnCheck={onUnCheck}
          />
        </div>
        <Text className={utils.p_basic} size="xs" theme="gray">
          For added protection, you’ll need to confirm your email address or
          phone number to reset your X password.&nbsp;
          <Link
            className={utils.link}
            href="https://help.x.com/safety-and-security/account-security-tips"
            target="_blank"
          >
            Learn more
          </Link>
        </Text>
      </div>
    </div>
  );
}
