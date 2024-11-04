'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { FormEventHandler, useState } from 'react';
import DivideLine from '@/app/_component/_util/DivideLine';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function Deactivate() {
  const { sendPrepareMessage } = useAlterModal();
  const [password, setPassword] = useState('');

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Text className={utils.p_basic} size="xl" bold="bold">
        Confirm your password
      </Text>
      <Text className={utils.p_basic} theme="gray" size="xs">
        Complete your deactivation request by entering the password associated
        with your account.
      </Text>
      <div className={cx(utils.bd_t_1_solid_gray, utils.p_basic)}>
        <IdentifierInput
          type="password"
          placeholder="Password"
          defaultValue={password}
          passwordHide
          onChange={(value) => {
            setPassword(value);
          }}
          withForgot
          noPad
        />
      </div>
      <DivideLine />
      <div
        className={cx(
          utils.pt_12,
          utils.pb_12,
          utils.d_flexRow,
          utils.flex_justiEnd
        )}
      >
        <TextButton
          className={cx(utils.ml_12, utils.mr_12)}
          type="submit"
          theme="red"
          text="Deactivate"
          disabled={password === ''}
        />
      </div>
    </form>
  );
}
