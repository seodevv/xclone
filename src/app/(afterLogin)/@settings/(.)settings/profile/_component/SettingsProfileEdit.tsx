'use client';

import styles from './settingsProfile.edit.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getFileDataURL } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';
import ProfileBanner from '@/app/(afterLogin)/_component/profile/ProfileBanner';
import ProfileImage from '@/app/(afterLogin)/_component/profile/ProfileImage';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import IdentifierTextarea from '@/app/_component/_input/IdentifierTextarea';
import SettingsProfileBirth from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfileBirth';
import Link from 'next/link';
import GreatherArrowSvg from '@/app/_svg/arrow/GreatherArrowSvg';
import Text from '@/app/_component/_text/Text';
import { ISettingsProfile } from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfile';
import { REGEX_URL } from '@/app/_lib/regex';
import useUpdateProfileMutation from '@/app/(afterLogin)/@settings/(.)settings/profile/_hooks/useUpdateProfileMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useSession } from 'next-auth/react';

interface Props {
  user?: AdvancedUser;
  profile: ISettingsProfile;
  setProfile: Dispatch<SetStateAction<ISettingsProfile>>;
}

export interface ISettingsProfileOptions {
  initial: boolean;
  clear: boolean;
  error: {
    nickname: boolean;
    location: boolean;
    refer: boolean;
  };
  disabled: boolean;
  updated: {
    nickname: boolean;
    desc: boolean;
    location: boolean;
    refer: boolean;
    birth: boolean;
    image: boolean;
    banner: boolean;
  };
}

export default function SettingsProfileEdit({
  user,
  profile,
  setProfile,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateProfileMutation();
  const { alterMessage } = useAlterModal();
  const { data: session, update } = useSession();
  const [options, setOptions] = useState<ISettingsProfileOptions>({
    initial: false,
    clear: false,
    error: {
      nickname: false,
      location: false,
      refer: false,
    },
    disabled: true,
    updated: {
      nickname: false,
      desc: false,
      location: false,
      refer: false,
      birth: false,
      image: false,
      banner: false,
    },
  });

  const onSubmitProfileEdit = () => {
    if (!session?.user?.email) return;

    updateProfileMutation.mutate(
      {
        queryClient,
        sessionId: session.user.email,
        profile,
        updated: options.updated,
      },
      {
        onSuccess: (response) => {
          update({ name: response.data.nickname, image: response.data.image });
          router.back();
          router.refresh();
        },
        onError: () => {
          alterMessage(
            'Something went wrong, but don’t fret — it’s not your fault.'
          );
        },
      }
    );
  };

  const onLoadHandler = async ({
    type,
    file,
  }: {
    type: 'banner' | 'image';
    file?: File;
  }) => {
    if (file) {
      const link = await getFileDataURL(file);
      setProfile((prev) => ({
        ...prev,
        banner:
          type === 'banner'
            ? {
                link,
                file,
              }
            : prev.banner,
        image:
          type === 'image'
            ? {
                link,
                file,
              }
            : prev.image,
        editor: type,
      }));
    } else {
      if (type === 'image' && user?.image) {
        setProfile((prev) => ({
          ...prev,
          image: {
            link: user.image,
          },
        }));
      }
    }
  };

  const onClearBanner = () => {
    if (!user) return;

    if (user.banner === profile.banner?.link) {
      setProfile((prev) => ({ ...prev, banner: undefined }));
      setOptions((prev) => ({ ...prev, clear: true }));
    } else {
      setProfile((prev) => ({
        ...prev,
        banner:
          user.banner && !options.clear ? { link: user.banner } : undefined,
      }));
    }
  };

  const errorHandler = (
    id: keyof ISettingsProfileOptions['error'],
    error: boolean
  ) => {
    setOptions((prev) => ({ ...prev, error: { ...prev.error, [id]: error } }));
  };

  useEffect(() => {
    if (!user) return;
    if (Object.values(options.error).some((v) => v)) {
      setOptions((prev) => ({ ...prev, disabled: true }));
    } else {
      const nickname = profile.nickname === user.nickname;
      const desc =
        typeof user.desc === 'undefined'
          ? profile.desc === ''
          : profile.desc === user.desc;
      const location =
        typeof user.location === 'undefined'
          ? profile.location === ''
          : profile.location === user.location;
      const refer =
        typeof user.refer === 'undefined'
          ? profile.refer === ''
          : profile.refer === user.refer;
      const birth = profile.birth?.date === user.birth?.date;
      const image = profile.image?.link === user.image;
      const banner = profile.banner?.link === user.banner;

      const isInitial =
        nickname && desc && location && refer && birth && image && banner;
      setOptions((prev) => ({
        ...prev,
        disabled: isInitial,
        updated: {
          nickname: !nickname,
          desc: !desc,
          location: !location,
          refer: !refer,
          birth: !birth,
          image: !image,
          banner: !banner,
        },
      }));
    }
  }, [user, profile, options.error, setOptions]);

  if (!user) return null;

  return (
    <div className={styles.content}>
      <IListHeader
        title="Edit profile"
        disabled={options.disabled}
        onClick={onSubmitProfileEdit}
      />
      <div>
        <ProfileBanner
          mode="edit"
          imageSrc={profile.banner?.link}
          onLoad={(file) => onLoadHandler({ type: 'banner', file })}
          onClear={onClearBanner}
        />
        <ProfileImage
          mode="edit"
          imageSrc={profile.image?.link}
          onLoad={(file) => onLoadHandler({ type: 'image', file })}
        />
        <div className={styles.inputs}>
          <IdentifierInput
            placeholder="Name"
            defaultValue={profile.nickname ? profile.nickname : user.nickname}
            validate={{ allowBlank: true, maxLength: 50 }}
            onSuccess={(value) => {
              setProfile((prev) => ({ ...prev, nickname: value }));
              errorHandler('nickname', false);
            }}
            onError={() => errorHandler('nickname', true)}
          />
        </div>
        <div className={styles.inputs}>
          <IdentifierTextarea
            placeholder="Bio"
            defaultValue={profile.desc ? profile.desc : user.desc}
            validate={{ maxLength: 180 }}
            minRow={3}
            onSuccess={(value) =>
              setProfile((prev) => ({ ...prev, desc: value }))
            }
          />
        </div>
        <div className={styles.inputs}>
          <IdentifierInput
            placeholder="Location"
            defaultValue={profile.location ? profile.location : user.location}
            validate={{ allowEmpty: true, allowBlank: true, maxLength: 30 }}
            onSuccess={(value) => {
              setProfile((prev) => ({ ...prev, location: value }));
              errorHandler('location', false);
            }}
            onError={() => errorHandler('location', true)}
          />
        </div>
        <div className={styles.inputs}>
          <IdentifierInput
            placeholder="Website"
            defaultValue={profile.refer ? profile.refer : user.refer}
            validate={{
              allowEmpty: true,
              maxLength: 100,
              regex: REGEX_URL,
              message: 'Please enter the correct URL.',
            }}
            onSuccess={(value) => {
              setProfile((prev) => ({ ...prev, refer: value }));
              errorHandler('refer', false);
            }}
            onError={() => errorHandler('refer', true)}
          />
        </div>
        <SettingsProfileBirth
          user={user}
          setProfile={setProfile}
          onChange={(birth) => {
            setProfile((prev) => ({ ...prev, birth }));
          }}
          onReset={() => {
            setProfile((prev) => ({ ...prev, birth: user.birth }));
          }}
        />
        <Link className={styles.link} href="/i/flow/convert_to_professional">
          <Text size="xl" text="Switch to profiessional" />
          <div>
            <GreatherArrowSvg />
          </div>
        </Link>
      </div>
    </div>
  );
}
