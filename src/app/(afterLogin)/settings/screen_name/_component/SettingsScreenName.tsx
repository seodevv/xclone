'use client';

import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import styles from './settingsScreenName.module.css';
import useSettingsSessionStore from '@/app/(afterLogin)/_store/SettingsStore';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import DivideLine from '@/app/_component/_util/DivideLine';
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Text from '@/app/_component/_text/Text';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import { useConflictMutation } from '@/app/(afterLogin)/settings/_hooks/useConflictMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function SettingsScreenName() {
  const { alterMessage } = useAlterModal();
  const { data: myProfile } = useMyProfileQuery();
  const user = useSettingsSessionStore((state) => state.user);
  const [username, setUsername] = useState('');
  const [suggest, setSuggest] = useState<string[]>([]);
  const [conflict, setConflict] = useState(false);
  const inputRef = useRef<IdentifierInputRef>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const conflictMutation = useConflictMutation();

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alterMessage(
      'Sorry, you are rate limited. Please wait a few moments then try again.'
    );
  };
  const onChangeUsername = (value: string) => {
    setUsername(value);
    generateSuggest(value);
    inputRef.current?.error({ flag: false });
    setConflict(true);

    if (value === '' || value.trim() === '' || myProfile?.data.id === value) {
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    if (value.length < 2) {
      inputRef.current?.error({
        flag: true,
        message: 'Your username must be longer than 2 charcaters.',
      });
    } else {
      conflictMutation.mutate(
        { username: value },
        {
          onSuccess: () => {
            setConflict(false);
          },
          onError: () => {
            inputRef.current?.error({
              flag: true,
              message: 'This username is unavailable. Please try another.',
            });
          },
        }
      );
    }
  };
  const generateSuggest = (value: string) => {
    setSuggest(
      Array(5)
        .fill(value !== '' ? value.replace(/_[0-9]+$/, '') : user?.id)
        .map((v) => `${v}_${~~(Math.random() * 100000).toString()}`)
    );
  };

  useEffect(() => {
    if (typeof myProfile !== 'undefined') {
      const id = myProfile.data.id;
      setUsername(id);
      generateSuggest(id);
    }
  }, [myProfile, setSuggest]);

  return (
    <form onSubmit={onSubmitForm}>
      <div className={styles.input}>
        <IdentifierInput
          ref={inputRef}
          placeholder="Username"
          defaultValue={myProfile?.data.id}
          onChange={onChangeUsername}
        />
      </div>
      <DivideLine />
      <PageHeader title="Suggestions" height={48} noBack />
      <div className={styles.suggestions}>
        {suggest.map((text, i) => (
          <SuggestButton
            key={i}
            text={text}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.setValue(text);
              setUsername(text);
            }}
          />
        ))}
      </div>
      <DivideLine />
      <div className={styles.submit}>
        <TextButton
          className={styles.button}
          type="submit"
          text="Save"
          theme="primary"
          disabled={user?.id === username || conflict}
        />
      </div>
    </form>
  );
}

function SuggestButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={styles.item} onClick={onClick} type="button">
      <Text text={text} theme="primary" />
    </button>
  );
}
