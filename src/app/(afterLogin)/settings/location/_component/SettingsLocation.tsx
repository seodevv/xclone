'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import Text from '@/app/_component/_text/Text';
import useSettingsLocalStore, {
  locationSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import { Dispatch, SetStateAction } from 'react';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

export default function SettingsLocation() {
  const { sendPrepareMessage } = useAlterModal();
  const { location, setLocation } = useSettingsLocalStore(locationSelector);
  const { open, close } = useConfirmStore(confirmSelector);

  const onCheck = (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ permission: 'allow' });
          setCheck(check);
        },
        (error) => {
          setLocation({ permission: 'deny' });
        }
      );
    }
  };
  const onUnCheck = (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => {
    setLocation({ permission: 'none' });
    setCheck(check);
  };
  const onClickRemoveLocation = () => {
    open({
      flag: true,
      title: 'Remove all location information attached to your posts?',
      sub: 'Location labels you’ve added to your posts will no longer be visible on X.com, X for iOS, and X for Android. These updates may take some time to go into effect.',
      btnText: 'Delete',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        sendPrepareMessage();
        close();
      },
    });
  };

  return (
    <div>
      {location.permission === 'deny' && (
        <Text className={utils.p_basic} size="xs" theme="error">
          Your location services are not currently enabled on this device. You
          can turn them on in your device settings.
        </Text>
      )}
      <div className={utils.p_basic}>
        <IdentifierCheckBox
          title="Add location information to your posts"
          defaultValue={location.permission === 'allow'}
          onCheck={onCheck}
          onUnCheck={onUnCheck}
        />
      </div>
      <TransitionTextButton
        type="button"
        text="Remove all location information attached to your posts"
        theme="error"
        align="center"
        onClick={onClickRemoveLocation}
      />
    </div>
  );
}
