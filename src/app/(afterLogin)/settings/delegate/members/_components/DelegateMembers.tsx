'use client';

import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function DelegateMembers() {
  const { sendPrepareMessage } = useAlterModal();
  const content = 'No members have been added yet';

  return (
    <>
      <TransitionTextButton
        type="button"
        theme="primary"
        text="Invite a member"
        onClick={() => {
          sendPrepareMessage();
        }}
      />
      <DivideLine />
      <Text size="m" bold="bold" align="center">
        {content}
      </Text>
    </>
  );
}
