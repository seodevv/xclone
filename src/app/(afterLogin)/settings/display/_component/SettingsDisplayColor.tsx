'use client';

import styles from './settingsDisplay.color.module.css';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useSettingsLocalStore, {
  DisplaySelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import ColorCircleSvg from '@/app/_svg/_settings/ColorCircleSvg';
import CheckSvg from '@/app/_svg/input/CheckSvg';

export default function SettingsDisplayColor() {
  const { display, setDisplay } = useSettingsLocalStore(DisplaySelector);
  const colors: { id: SettingsLocalStore['display']['color'] }[] = [
    { id: 'blue' },
    { id: 'yellow' },
    { id: 'pink' },
    { id: 'purple' },
    { id: 'orange' },
    { id: 'green' },
  ];

  return (
    <div>
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Color
      </Text>
      <div className={styles.color}>
        {colors.map((v) => (
          <button
            key={v.id}
            className={styles.item}
            onClick={() => setDisplay({ color: v.id })}
          >
            <div className={styles.circle}>
              <ColorCircleSvg type={v.id} />
            </div>
            {display.color === v.id && (
              <div className={styles.check}>
                <CheckSvg width={25} theme="theme" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
