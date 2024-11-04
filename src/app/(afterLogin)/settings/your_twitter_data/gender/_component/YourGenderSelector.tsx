'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import DivideLine from '@/app/_component/_util/DivideLine';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import useSettingsLocalStore, {
  genderSelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { FormEventHandler, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function YourgenderSelector() {
  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const [temp, setTemp] = useState<SettingsLocalStore['gender']>({
    type: 'female',
    other: '',
  });
  const { gender, setGender } = useSettingsLocalStore(genderSelector);
  const radios = [
    { id: 'female', title: 'Female' },
    { id: 'male', title: 'Male' },
    { id: 'other', title: 'Add your gender' },
  ];

  const onSubmitGender: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setGender({
      type: temp.type,
      other: temp.type === 'other' ? temp.other : '',
    });
    alterMessage('Gender updated');
    router.push('/settings/your_twitter_data/account');
  };

  const onChangeGender = (value: string) => {
    if (value === 'female' || value === 'male' || value === 'other') {
      setTemp((prev) => ({ ...prev, type: value }));
    }
  };
  const onChangeOther = (value: string) => {
    setTemp((prev) => ({ ...prev, other: value }));
  };

  useLayoutEffect(() => {
    setTemp(gender);
  }, [gender]);

  return (
    <form onSubmit={onSubmitGender}>
      <DivideLine />
      <IdentifierRadioBox
        data={radios}
        name="gender"
        defaultValue={temp.type}
        onChange={onChangeGender}
      />
      {temp.type === 'other' && (
        <div className={cx(utils.pl_12, utils.pr_12)}>
          <IdentifierInput
            placeholder="Gender"
            defaultValue={temp.other}
            onChange={onChangeOther}
          />
        </div>
      )}
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
          className={cx(utils.ma_0, utils.ml_12, utils.mr_12)}
          text="Save"
          theme="primary"
          disabled={gender.type === temp.type && gender.other === temp.other}
        />
      </div>
    </form>
  );
}
