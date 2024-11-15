'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import useSettingsLocalStore, {
  GrokSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import { useContext } from 'react';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';

export default function GrokSettings() {
  const { dispatchModal, reset } = useContext(ConfirmContext);
  const { grok, setGrok } = useSettingsLocalStore(GrokSelector);
  const onClickDeleteConversation = () => {
    dispatchModal({
      type: 'setCustom',
      payload: {
        title: 'Do you want to delete your conversations?',
        sub: 'You’re about to delete your grok conversation history. You will not be able to access these conversations again.',
        btnText: 'Delete',
        btnTheme: 'theme',
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
      <IdentifierCheckBox
        title={
          'Allow your posts as well as your interactions, inputs, and results with Grok to be used for training and fine-tuning'
        }
        sub={
          <>
            To continuously improve your experience, we may utilize your X posts
            as well as your user interactions, inputs and results with Grok for
            training and fine-tuning purposes. This also means that your
            interactions, inputs, and results may also be shared with our
            service provider xAI for these purposes.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/about-grok'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noPad={false}
        noMargin
        defaultValue={grok.sharing}
        onChange={(value) => setGrok({ sharing: value })}
      />
      <TransitionTextButton
        type="button"
        text="Delete conversation history"
        theme="error"
        align="left"
        onClick={onClickDeleteConversation}
      />
    </div>
  );
}
