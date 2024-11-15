'use client';

import utils from '@/app/utility.module.css';
import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import Text from '@/app/_component/_text/Text';
import { useState } from 'react';
import Link from 'next/link';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function YourAudiences() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return (
      <div>
        <Text className={utils.p_basic} theme="gray">
          Tailored audiences are often built from email lists or browsing
          behaviors. They help advertisers reach prospective customers or people
          who have already expressed interest in their business.&nbsp;
          <Link
            className={utils.link}
            href={
              'https://help.x.com/safety-and-security/privacy-controls-for-tailored-ads'
            }
            target="_blank"
          >
            Learn more
          </Link>
        </Text>
        <DivideLine />
        <Text className={utils.p_basic}>
          You are currently a part of <b>0 audiences</b> from&nbsp;
          <b>0 advertisers</b>
        </Text>
        <DivideLine />
        <Text className={utils.p_basic} theme="gray">
          You can opt out of interest-based advertising in your personalization
          and data settings. This will change the ads you see on X, however it
          won’t remove you from advertisers’ audiences.
        </Text>
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
