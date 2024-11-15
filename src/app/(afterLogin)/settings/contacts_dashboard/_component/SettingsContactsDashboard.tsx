'use client';

import utils from '@/app/utility.module.css';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import { useContext, useState } from 'react';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import DivideLine from '@/app/_component/_util/DivideLine';
import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';

export default function SettingsContactsDashboard() {
  const [verified, setVerified] = useState(false);
  const { dispatchModal, reset } = useContext(ConfirmContext);
  const inform = (
    <>
      These are the contacts that you have imported from your mobile devices.
      This information is used to personalize your experience on X, such as
      suggesting accounts to follow. You can remove any contacts you’ve
      previously uploaded and turn off syncing with X on all devices. Please be
      aware that this takes a little time.&nbsp;
      <Link
        className={utils.link}
        href={
          'https://help.x.com/using-x/upload-your-contacts-to-search-for-friends'
        }
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const onClickRemoveContacts = () => {
    dispatchModal({
      type: 'setCustom',
      payload: {
        title: 'Remove all contacts?',
        sub: 'This removes any contacts you’ve previously uploaded and turns off syncing with X on all devices. Please be aware that this takes a little time, cannot be undone, and you may still notice some suggestions on X (based on your contacts) in the meantime. ',
        btnText: 'Remove',
        btnTheme: 'red',
        onClickCancle: () => {
          reset();
        },
        onClickConfirm: () => {
          reset();
        },
      },
    });
  };
  return (
    <div>
      <TransitionTextButton
        theme="error"
        text="Remove all contacts"
        onClick={onClickRemoveContacts}
      />
      <SettingsInform inform={inform} />
      <DivideLine />
      {verified && (
        <SettingsVerifyPassword
          title="Confirm your password"
          sub="Please enter your password in order to get this."
          btnText="Confirm"
        />
      )}
    </div>
  );
}
