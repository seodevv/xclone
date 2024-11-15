'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import DivideLine from '@/app/_component/_util/DivideLine';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import { FormEventHandler, useLayoutEffect, useRef, useState } from 'react';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import useSettingsLocalStore, {
  MutedWordSelector,
  MuteSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import { useRouter } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';

interface Options {
  timeline: boolean;
  notification: 'none' | 'anyone' | 'unfollow';
  duration: 'forever' | '24h' | '7d' | '30d';
}

interface Props {
  mode: 'add' | 'edit';
  id?: string;
}

export default function SettingsMutedWord({ mode, id }: Props) {
  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const mutedWord = useSettingsLocalStore(MutedWordSelector(id));
  const [keyword, setKeyword] = useState('');
  const keywordRef = useRef<IdentifierInputRef>(null);
  const [options, setOptions] = useState<Options>({
    timeline: true,
    notification: 'anyone',
    duration: 'forever',
  });
  const { mute, addMute, updateMute } = useSettingsLocalStore(MuteSelector);
  const disabled =
    (mode === 'add' && keyword === '') ||
    (mode === 'edit' &&
      mutedWord?.timeline === options.timeline &&
      mutedWord.notification === options.notification &&
      mutedWord.duration === options.duration);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (keyword === '') return;

    if (mode === 'add') {
      if (mute.find((v) => v.keyword === keyword)) {
        keywordRef.current?.error({
          flag: true,
          message: `You've already muted "${keyword}"`,
        });
        return;
      }

      addMute({
        keyword,
        timeline: options.timeline,
        notification: options.notification,
        duration: options.duration,
      });
    } else {
      updateMute({
        keyword,
        timeline: options.timeline,
        notification: options.notification,
        duration: options.duration,
      });
    }

    router.back();
    alterMessage(`${mode === 'add' ? 'Mute' : 'Updated'} "${keyword}"`);
  };

  useLayoutEffect(() => {
    if (mode === 'edit' && mutedWord) {
      setKeyword(mutedWord.keyword);
      setOptions({
        timeline: mutedWord.timeline,
        duration: mutedWord.duration,
        notification: mutedWord.notification,
      });
    }
  }, [mode, mutedWord]);

  return (
    <form onSubmit={onSubmitForm}>
      <div className={utils.p_basic}>
        <IdentifierInput
          ref={keywordRef}
          placeholder="Enter word or phrase"
          defaultValue={keyword}
          onChange={(value) => {
            keywordRef.current?.error({ flag: false });
            setKeyword(value);
          }}
          noPad
          disabled={mode === 'edit'}
        />
        {mode === 'add' && (
          <Text className={cx(utils.pl_8, utils.pr_8)} size="xs" theme="gray">
            You can mute one word, phrase, @username, or hashtag at a
            time.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/advanced-x-mute-options'}
              target="_blank"
            >
              Learn more
            </Link>
          </Text>
        )}
      </div>
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        Mute from
      </Text>
      <div className={utils.p_basic}>
        <IdentifierCheckBox
          title={'Home timeline'}
          noMargin
          defaultValue={options.timeline}
          onChange={(value) =>
            setOptions((prev) => ({ ...prev, timeline: value }))
          }
        />
      </div>
      <IdentifierToggle
        title={'Notifications'}
        defaultValue={options.notification !== 'none'}
        onChange={(value) =>
          setOptions((prev) => ({
            ...prev,
            notification: value ? 'anyone' : 'none',
          }))
        }
      />
      {options.notification !== 'none' && (
        <>
          <DivideLine />
          <IdentifierRadioBox
            name="mute"
            data={[
              { id: 'anyone', title: 'From anyone' },
              { id: 'unfollow', title: 'From people you don’t follow' },
            ]}
            defaultValue={options.notification}
            onChange={(value) => {
              if (value === 'anyone' || value === 'unfollow') {
                setOptions((prev) => ({ ...prev, notification: value }));
              }
            }}
          />
        </>
      )}
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        Duration
      </Text>
      <IdentifierRadioBox
        name="duration"
        data={[
          { id: 'forever', title: 'forever you unmute the word' },
          { id: '24h', title: '24 hours' },
          { id: '7d', title: '7 days' },
          { id: '30d', title: '30 days' },
        ]}
        defaultValue={options.duration}
        onChange={(value) => {
          if (
            value === 'forever' ||
            value === '24h' ||
            value === '7d' ||
            value === '30d'
          ) {
            setOptions((prev) => ({ ...prev, duration: value }));
          }
        }}
      />
      <DivideLine />
      <div
        className={cx(
          utils.d_flexRow,
          utils.flex_justiEnd,
          utils.pt_12,
          utils.pb_12
        )}
      >
        <TextButton
          className={cx(utils.ml_12, utils.mr_12)}
          type="submit"
          text="Save"
          theme="primary"
          disabled={disabled}
        />
      </div>
    </form>
  );
}
