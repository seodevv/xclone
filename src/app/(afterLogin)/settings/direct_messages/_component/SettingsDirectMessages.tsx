'use client';

import useSettingsLocalStore, {
  DirectMessagesSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsDirectMessages() {
  const { directMessages, setDirectMessages } = useSettingsLocalStore(
    DirectMessagesSelector
  );

  return (
    <div>
      <div className={utils.p_basic}>
        <Text className={utils.pt_12} bold="bold">
          Allow message requests from:
        </Text>
        <Text size="xs" theme="gray">
          People you follow will always be able to message you.&nbsp;
          <Link
            className={utils.link}
            href={'https://help.x.com/using-x/direct-messages#receive'}
            target="_blank"
          >
            Learn more
          </Link>
        </Text>
        <IdentifierRadioBox
          name="allow"
          data={[
            { id: 'no', title: 'No one' },
            { id: 'veirifed', title: 'Verified users' },
            { id: 'every', title: 'Everyone' },
          ]}
          defaultValue={directMessages.allow}
          noPad
          onChange={(value) => {
            if (value === 'no' || value === 'verified' || value === 'every') {
              setDirectMessages({ allow: value });
            }
          }}
        />
      </div>
      <DivideLine />
      <div className={utils.pa_16}>
        <IdentifierCheckBox
          title={'Filter low-quality messages'}
          sub={
            <>
              Hide message requests that have been detected as being potentially
              spam or low-quality. These will be sent to a separate inbox at the
              bottom of your message requests. You can still access them if you
              want.&nhsp;
              <Link
                className={utils.link}
                href={'https://help.x.com/using-x/direct-messages'}
                target="_blank"
              >
                Learn more
              </Link>
            </>
          }
          defaultValue={directMessages.filterLowQuality}
          disable
          noMargin
        />
      </div>
      <div className={utils.pa_16}>
        <IdentifierCheckBox
          title={'Show read receipts'}
          sub={
            <>
              Let people you’re messaging with know when you’ve seen their
              messages. Read receipts are not shown on message requests.&nhsp;
              <Link
                className={utils.link}
                href={'https://help.x.com/using-x/direct-messages#receipts'}
                target="_blank"
              >
                Learn more
              </Link>
            </>
          }
          defaultValue={directMessages.readReceipts}
          noMargin
          onChange={(value) => setDirectMessages({ readReceipts: value })}
        />
      </div>
    </div>
  );
}
