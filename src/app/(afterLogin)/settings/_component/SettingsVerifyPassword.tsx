'use client';

import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useConfirmPassword from '@/app/(afterLogin)/settings/_hooks/useConfirmPassword';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useAlterModal from '@/app/_hooks/useAlterModal';
import utils from '@/app/utility.module.css';
import { AdvancedUser } from '@/model/User';
import cx from 'classnames';
import { FormEventHandler, useRef, useState } from 'react';

interface Props {
  title?: string;
  sub?: string;
  btnText?: string;
  noDivideLine?: boolean;
  onSuccess?: (user: AdvancedUser) => void;
  onFailed?: (error: Error) => void;
}

export default function SettingsVerifyPassword({
  title = 'Save account changes',
  sub = 'Re-enter your X password to save changes to your account.',
  btnText = 'Save',
  noDivideLine,
  onSuccess,
  onFailed,
}: Props) {
  const { alterMessage } = useAlterModal();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<IdentifierInputRef>(null);
  const confirmMutation = useConfirmPassword();
  const onSubmitPassword: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setLoading(true);
    confirmMutation.mutate(
      {
        password,
      },
      {
        onSuccess: (response) => {
          setLoading(false);
          if (typeof onSuccess === 'function') {
            onSuccess(response.data);
          }
        },
        onError: (error) => {
          alterMessage('The password you entered was incorrect.', 'warning');
          setLoading(false);
          setPassword('');
          passwordRef.current?.setValue('');
          passwordRef.current?.focus();
          if (typeof onFailed === 'function') {
            onFailed(error);
          }
        },
      }
    );
  };
  const onChangeInput = (value: string) => {
    setPassword(value);
  };

  return (
    <form onSubmit={onSubmitPassword}>
      <Text className={utils.p_basic} size="xl" bold="bold">
        {title}
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        {sub}
      </Text>
      <div className={cx(utils.p_basic, utils.bd_t_1_solid_gray)}>
        <IdentifierInput
          ref={passwordRef}
          type="password"
          placeholder="Password"
          noPad
          withForgot
          passwordHide
          autoFocus
          onChange={onChangeInput}
        />
      </div>
      {!noDivideLine && <DivideLine />}
      <div
        className={cx(
          utils.pt_12,
          utils.pb_12,
          utils.d_flexRow,
          utils.flex_justiEnd
        )}
      >
        <TextButton
          className={(utils.ml_12, utils.mr_12)}
          type="submit"
          theme="primary"
          text={btnText}
          loading={loading}
          disabled={password === ''}
        />
      </div>
    </form>
  );
}
