'use client';

import utils from '@/app/utility.module.css';
import DivideLine from '@/app/_component/_util/DivideLine';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

export default function OtherSession() {
  const { sendPrepareMessage } = useAlterModal();
  const { open, close } = useConfirmStore(confirmSelector);

  const onClickLogOut = () => {
    open({
      flag: true,
      title: 'Do you want to end your other sessions?',
      sub: 'You’re about to end your other active X sessions, and you’ll need to log in again on those devices to start a new ones.',
      btnText: 'Log out',
      onClickConfirm: () => {
        sendPrepareMessage();
        close();
      },
      onClickCancle: () => {
        close();
      },
    });
  };

  return (
    <div>
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        Log out of other sessions
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        You’re logged into these accounts on these devices and aren’t currently
        using them.
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        This will end your active X session.&nbsp;
        <Link
          className={utils.link}
          href="https://help.x.com/managing-your-account/connect-or-revoke-access-to-third-party-apps"
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
      <TransitionTextButton
        text="Log out of all other sessions"
        theme="error"
        align="left"
        onClick={onClickLogOut}
      />
    </div>
  );
}
