'use client';

import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import styles from './languageSelector.module.css';
import Text from '@/app/_component/_text/Text';
import { FormEventHandler, useState } from 'react';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function LanguageSelector() {
  const [languages, setLanguages] = useState([
    { id: 0, title: 'English', check: true },
    { id: 1, title: 'Korean - 한국어', check: true },
    { id: 2, title: 'Chinese - 中文', check: false },
    { id: 3, title: 'French - français', check: false },
    { id: 4, title: 'German - Deutsch', check: false },
    { id: 5, title: 'Italian - italiano', check: false },
    { id: 6, title: 'Japanese - 日本語', check: false },
    { id: 7, title: 'Portuguese - português', check: false },
    { id: 8, title: 'Russian - русский', check: false },
    { id: 9, title: 'Spanish - español', check: false },
    { id: 10, title: 'Other', check: false },
  ]);
  const [more, setMore] = useState(false);
  const title = 'Which languages do you speak?';
  const sub =
    'You’ll be able to see posts, people, and trends in any languages you choose.';

  const { sendPrepareMessage } = useAlterModal();
  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendPrepareMessage();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <div className={styles.container}>
        <div className={styles.inform}>
          <Text size="xxxl" bold="bold">
            {title}
          </Text>
          <Text className={styles.sub} theme="gray">
            {sub}
          </Text>
        </div>
        {languages.map((lan, i) => {
          if (!more && !lan.check) return null;
          return (
            <Language
              key={lan.id}
              title={lan.title}
              defaultValue={lan.check}
              onChange={(check) => {
                const shallow = [...languages];
                shallow[i] = {
                  ...lan,
                  check,
                };
                setLanguages(languages);
              }}
            />
          );
        })}
        {!more && (
          <button
            className={styles.more}
            type="button"
            onClick={() => {
              setMore(true);
            }}
          >
            <Text theme="primary">Show more</Text>
          </button>
        )}
      </div>
      <div className={styles.button}>
        <FlexButton
          className={styles.done}
          type="submit"
          theme="white"
          text="Done"
          large
        />
      </div>
    </form>
  );
}

function Language({
  title,
  defaultValue,
  onChange,
}: {
  title: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className={styles.item}>
      <div className={styles.language}>
        <IdentifierCheckBox
          title={title}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
