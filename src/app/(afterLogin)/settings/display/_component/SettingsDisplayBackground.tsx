'use client';

import styles from './settingsDisplay.bacgkround.module.css';
import cx from 'classnames';
import useSettingsLocalStore, {
  DisplaySelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import CheckSvg from '@/app/_svg/input/CheckSvg';

export default function SettingsDisplayBackground() {
  const { display, setDisplay } = useSettingsLocalStore(DisplaySelector);
  const backgrounds: {
    id: SettingsLocalStore['display']['background'];
    title: string;
    theme?: 'theme' | 'gray' | 'primary' | 'error' | 'black' | 'green';
  }[] = [
    { id: 'default', title: 'Default', theme: 'black' },
    { id: 'dim', title: 'Dim' },
    { id: 'lights_out', title: 'Lights out' },
  ];

  return (
    <div>
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Background
      </Text>
      <div className={styles.background}>
        {backgrounds.map((v) => (
          <button
            className={cx(
              styles.item,
              styles[v.id],
              display.background === v.id && styles.active
            )}
            onClick={() => setDisplay({ background: v.id })}
          >
            <div className={styles.circle}>
              <div
                className={cx(
                  styles.check,
                  styles[v.id],
                  display.background === v.id && styles.active
                )}
              >
                {display.background === v.id && <CheckSvg width={16} white />}
              </div>
            </div>
            <div className={styles.text}>
              <Text size="s" bold="bold" theme={v.theme}>
                {v.title}
              </Text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
