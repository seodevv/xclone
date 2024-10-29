'use client';

import styles from './settingsProfile.module.css';
import SettingsProfileEdit from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfileEdit';
import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import PhotoEditor from '@/app/_component/_photo/PhotoEditor';
import { Birth } from '@/model/User';
import { useEffect, useRef, useState } from 'react';

interface Props {
  sessionid: string;
}

export interface ISettingsProfile {
  nickname: string;
  desc: string | null;
  location: string | null;
  refer: string | null;
  birth: Birth | null;
  image: {
    link: string;
    file?: File;
  } | null;
  banner: {
    link: string;
    file?: File;
  } | null;
  editor: 'idle' | 'banner' | 'image';
}

export default function SettingsProfile({ sessionid }: Props) {
  const { data: user } = useUserQuery(sessionid);
  const [profile, setProfile] = useState<ISettingsProfile>({
    nickname: '',
    desc: null,
    location: null,
    refer: null,
    birth: null,
    image: null,
    banner: null,
    editor: 'idle',
  });
  const initialSet = useRef(false);

  const onComplete = ({
    type,
    link,
    file,
  }: {
    type: 'banner' | 'image';
    link: string;
    file: File;
  }) => {
    setProfile((prev) => ({ ...prev, [type]: { link, file }, editor: 'idle' }));
  };
  const onClose = () => setProfile((prev) => ({ ...prev, editor: 'idle' }));

  useEffect(() => {
    if (user) {
      if (!initialSet.current) {
        setProfile((prev) => ({
          ...prev,
          nickname: user.data.nickname,
          desc: user.data.desc,
          location: user.data.location,
          refer: user.data.refer,
          birth: user.data.birth,
          image: {
            link: user.data.image,
          },
          banner: user.data.banner
            ? {
                link: user.data.banner,
              }
            : null,
        }));
        initialSet.current = true;
      }
    }
  }, [user, setProfile]);

  return (
    <section className={styles.main}>
      {profile.editor === 'idle' && (
        <SettingsProfileEdit
          user={user?.data}
          profile={profile}
          setProfile={setProfile}
        />
      )}
      {profile.editor === 'banner' &&
        profile.banner?.link &&
        profile.banner.file && (
          <div style={{ height: 650 }}>
            <PhotoEditor
              imageSrc={profile.banner.link}
              fileName={profile.banner.file.name}
              aspect={3}
              cropShape="rect"
              onComplete={(link, file) =>
                onComplete({ type: 'banner', link, file })
              }
              onClose={onClose}
            />
          </div>
        )}
      {profile.editor === 'image' &&
        profile.image?.link &&
        profile.image.file && (
          <div style={{ height: 650 }}>
            <PhotoEditor
              imageSrc={profile.image.link}
              fileName={profile.image.file.name}
              aspect={1}
              onComplete={(link, file) =>
                onComplete({ type: 'image', link, file })
              }
              onClose={onClose}
            />
          </div>
        )}
    </section>
  );
}
