'use client';

import styles from './muteWord.module.css';
import Text from '@/app/_component/_text/Text';
import useSettingsLocalStore, {
  MuteSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import DivideLine from '@/app/_component/_util/DivideLine';
import MuteSvg from '@/app/_svg/post/MuteSvg';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useRouter } from 'next/navigation';

export default function SettingsMutedWords() {
  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const { mute, removeMute } = useSettingsLocalStore(MuteSelector);

  const onClickMutedWordOptions = (keyword: string) => {
    router.push(`/settings/muted_keywords/${keyword}`);
  };

  const onClickMute = (keyword: string) => {
    removeMute(keyword);
    alterMessage(`Unmuted "${keyword}"`);
  };

  return (
    <div>
      {mute.map((v) => (
        <div
          key={v.keyword}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClickMutedWordOptions(v.keyword);
          }}
        >
          <div className={styles.word}>
            <div className={styles.text}>
              <Text>{v.keyword}</Text>
              <Text size="xs" theme="gray">
                {v.duration}
              </Text>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickMute(v.keyword);
              }}
            >
              <MuteSvg width={20} inherit />
            </button>
          </div>
          <DivideLine />
        </div>
      ))}
    </div>
  );
}
