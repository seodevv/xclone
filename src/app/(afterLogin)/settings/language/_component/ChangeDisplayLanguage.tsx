'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IdentifierSelector from '@/app/_component/_input/IdentifierSelector';
import Text from '@/app/_component/_text/Text';
import { FormEventHandler, useState } from 'react';
import DivideLine from '@/app/_component/_util/DivideLine';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function ChangeDisplayLanguage() {
  const { sendPrepareMessage } = useAlterModal();
  const [language, setLanguage] = useState('english');
  const data = [
    { id: 'English', value: 'english' },
    { id: 'Korean - 한국어', value: 'korean' },
    { id: 'Japanese - 日本語', value: 'japan' },
  ];
  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };
  return (
    <form onSubmit={onSubmitForm}>
      <div className={utils.ma_20}>
        <IdentifierSelector
          placeholder="Display language"
          data={data}
          defaultValue={language}
          onChange={(value) => {
            setLanguage(value);
          }}
        />
        <Text className={utils.p_small} theme="gray" size="xs">
          Select your preferred language for headlines, buttons, and other text
          from X on this account. This does not change the language of the
          content you see in your timeline.
        </Text>
      </div>
      <DivideLine />
      <div
        className={cx(
          utils.d_flexColumn,
          utils.flex_alignEnd,
          utils.pt_12,
          utils.pb_12
        )}
      >
        <TextButton
          className={cx(utils.ml_12, utils.mr_12)}
          type="submit"
          theme="primary"
          text="Save"
          disabled={language === 'english'}
        />
      </div>
    </form>
  );
}
