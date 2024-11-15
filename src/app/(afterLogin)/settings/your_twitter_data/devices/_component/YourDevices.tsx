'use client';

import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

export default function YourDevices() {
  const [verified, setVerified] = useState(false);
  const inform = (
    <>
      These are browsers, devices, and information X uses to personalize your
      experience. This includes devices and browsers you haven’t used to log in
      to X, as well as email addresses and phone numbers like those linked to
      your X account.&nbsp;
      <Link
        className={utils.link}
        href="https://help.x.com/about-personalization-across-your-devices"
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );

  if (verified) {
    return (
      <div>
        <DivideLine />
        <SettingsInform inform={inform} />
        <div className={cx(utils.pt_48, utils.pl_70, utils.pr_70)}>
          <Text className={utils.pb_4} size="xl" align="center">
            This setting is off.
          </Text>
          <Text size="xs" theme="gray" align="center">
            To enable this, go to your Inferred&nbsp;
            <Link className={utils.link} href="/settings/off_twitter_activity">
              identity settings
            </Link>
            &nbsp;and turn on “Personalize based on your inferred identity”.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <SettingsVerifyPassword
      title="Confirm your password"
      sub="Please enter your password in order to get this."
      btnText="Confirm"
      noDivideLine
      onSuccess={() => {
        setVerified(true);
      }}
    />
  );
}
