'use client';

import utils from '@/app/utility.module.css';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import { useState } from 'react';
import DivideLine from '@/app/_component/_util/DivideLine';
import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function SettingsContactsDashboard() {
  const [verified, setVerified] = useState(true);
  const { open, close } = useConfirmStore(confirmSelector);
  const { sendPrepareMessage } = useAlterModal();
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
    open({
      flag: true,
      title: 'Remove all contacts?',
      sub: 'This removes any contacts you’ve previously uploaded and turns off syncing with X on all devices. Please be aware that this takes a little time, cannot be undone, and you may still notice some suggestions on X (based on your contacts) in the meantime. ',
      btnText: 'Remove',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        close();
        sendPrepareMessage();
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
          onSuccess={() => {
            setVerified(false);
          }}
        />
      )}
    </div>
  );
}
