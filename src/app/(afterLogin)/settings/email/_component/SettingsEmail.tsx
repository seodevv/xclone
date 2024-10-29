'use client';

import DivideLine from '@/app/_component/_util/DivideLine';
import styles from './settingsEmail.module.css';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import FlexLink from '@/app/(afterLogin)/_component/Link/FlexLink';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';

export default function SettingsEmail() {
  const { data: MyProfile } = useMyProfileQuery();

  return (
    <div>
      <div className={styles.padding}>
        <IdentifierInput
          placeholder="Current"
          defaultValue={`${MyProfile?.data.id}@xclone.com`}
          disabled
        />
      </div>
      <DivideLine />
      <FlexLink href="/i/flow/add_email" content="Update email address" />
    </div>
  );
}
