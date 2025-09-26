'use client';

import styles from './settingsProfile.birth.module.css';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import BirthSelector from '@/app/(beforeLogin)/_component/_sign/BirthSelector';
import IdentifierSelector from '@/app/_component/_input/IdentifierSelector';
import { Dispatch, SetStateAction, useState } from 'react';
import { MONTH_EN } from '@/app/_lib/common';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteUserBirth from '@/app/(afterLogin)/@settings/(.)settings/profile/_hooks/useDeleteUserBirth';
import { AdvancedUser, Birth } from '@/model/User';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { ISettingsProfile } from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfile';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

interface Props {
  user: AdvancedUser;
  setProfile: Dispatch<SetStateAction<ISettingsProfile>>;
  onChange?: ({ date, scope: { month, year } }: Birth) => void;
  onReset?: () => void;
}

export default function SettingsProfileBirth({
  user,
  setProfile,
  onChange,
  onReset,
}: Props) {
  const { data: session } = useSession();
  const { open, close } = useConfirmStore(confirmSelector);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState<Birth>({
    date: user.birth?.date || '',
    scope: {
      month: user.birth?.scope.month || 'each',
      year: user.birth?.scope.year || 'only',
    },
  });

  const onClickEdit = () => {
    if (edit) {
      setEdit(false);
      if (typeof onReset === 'function') {
        onReset();
      }
    } else {
      open({
        flag: true,
        title: 'Edit date of birth?',
        sub: 'This can only be changed a few times. Make sure you enter the age of the person using the account.',
        btnText: 'Edit',
        onClickCancle: () => {
          close();
        },
        onClickConfirm: () => {
          setEdit(true);
          close();
        },
        noHidden: true,
      });
    }
  };

  const onChangeDate = (date: Date) => {
    const value = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    inputHandler({ id: 'date', value });
  };

  const inputHandler = ({
    id,
    value,
  }: {
    id: 'date' | 'month' | 'year';
    value: string;
  }) => {
    const newInput: typeof input = {
      ...input,
      [id]: value,
    };
    setInput(newInput);

    if (typeof onChange === 'function') {
      onChange(newInput);
    }
  };

  const { alterMessage } = useAlterModal();
  const queryClient = useQueryClient();
  const birthDeleteMutation = useDeleteUserBirth();
  const onClickRemoveBirth = () => {
    if (!session?.user?.email) return;
    if (!user?.birth) return;

    open({
      flag: true,
      title: 'Remove birth date?',
      sub: 'This will remove it from your profile.',
      btnText: 'Remove',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        deleteBirth();
        close();
      },
      noHidden: true,
    });
  };
  const deleteBirth = () => {
    if (!session?.user?.email) return;
    birthDeleteMutation.mutate(
      {
        queryClient: queryClient,
        sessionid: session.user.email,
      },
      {
        onSuccess: () => {
          setEdit(false);
          setProfile((prev) => ({ ...prev, birth: null }));
        },
        onError: () => {
          alterMessage('Something is wrong. please try again.');
        },
      }
    );
  };

  return (
    <div className={styles.birth}>
      <div className={styles.date}>
        <Text
          text="Birth date"
          theme={edit ? 'theme' : 'gray'}
          bold={edit ? 'bold' : 'normal'}
        />
        <Text text="ㆍ" theme="gray" />
        <button className={styles.edit} onClick={onClickEdit}>
          {edit ? (
            <Text text="Cancel" theme="primary" />
          ) : (
            <Text text="Edit" theme="primary" />
          )}
        </button>
      </div>
      {edit ? (
        <>
          <div className={styles.birthInfo}>
            <Text
              text="This should be the date of birth of the person using the
          account. Even if you’re making an account for your
          business, event, or cat."
              theme="gray"
            />
          </div>
          <div className={styles.birthInfo}>
            <Text theme="gray">
              X uses your age to customize your experience, including ads, as
              explained in our{' '}
              <Link
                className={styles.href}
                href="https://x.com/ko/privacy"
                target="_blank"
              >
                Privacy Policy.
              </Link>
            </Text>
          </div>
          <BirthSelector
            defaultValue={user.birth?.date}
            onSuccess={onChangeDate}
          />
          <div className={styles.see}>
            <Text text="Who sees this" bold="bold" />
            <Text theme="gray">
              You can control who sees your birthday on X.{' '}
              <Link
                className={styles.href}
                href="https://help.x.com/ko/safety-and-security/birthday-visibility-settings"
                target="_blank"
              >
                Learn more
              </Link>
            </Text>
            <div className={styles.selector}>
              <IdentifierSelector
                placeholder="Month and day"
                defaultValue={input.scope.month}
                data={[
                  { id: 'public', value: 'public' },
                  { id: 'you followers', value: 'following' },
                  { id: 'people you follow', value: 'follow' },
                  { id: 'you follow each other', value: 'each' },
                  { id: 'only you', value: 'only' },
                ]}
                onChange={(value) => inputHandler({ id: 'month', value })}
              />
            </div>
            <div className={styles.selector}>
              <IdentifierSelector
                placeholder="Year"
                defaultValue={input.scope.year}
                data={[
                  { id: 'public', value: 'public' },
                  { id: 'you followers', value: 'following' },
                  { id: 'people you follow', value: 'follow' },
                  { id: 'you follow each other', value: 'each' },
                  { id: 'only you', value: 'only' },
                ]}
                onChange={(value) => inputHandler({ id: 'year', value })}
              />
            </div>
          </div>
          {user?.birth && (
            <div className={styles.delete}>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={onClickRemoveBirth}
              >
                <Text text="Remove birth date" theme="error" />
              </button>
            </div>
          )}
        </>
      ) : (
        <Text
          size="m"
          text={
            user.birth?.date
              ? `${MONTH_EN[new Date(user.birth.date).getMonth()]} ${new Date(
                  user.birth.date
                ).getDate()}, ${new Date(user.birth.date).getFullYear()}`
              : 'Add your date of birth'
          }
        />
      )}
    </div>
  );
}
