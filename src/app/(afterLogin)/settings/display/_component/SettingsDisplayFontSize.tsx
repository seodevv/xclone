'use client';

import styles from './settingsDisplay.fontsize.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useSettingsLocalStore, {
  DisplaySelector,
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsDisplayFontSize() {
  const { display, setDisplay } = useSettingsLocalStore(DisplaySelector);

  const steps: { id: SettingsLocalStore['display']['fontsize'] }[] = [
    { id: 'ex_small' },
    { id: 'small' },
    { id: 'default' },
    { id: 'large' },
    { id: 'ex_large' },
  ];

  return (
    <div>
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Font size
      </Text>
      <div className={styles.fontSize}>
        <Text size="fs_12">Aa</Text>
        <div className={styles.bar}>
          <div className={styles.inner}>
            <div className={styles.space}></div>
            <div
              className={cx(
                styles.progress,
                styles[`progress_${display.fontsize}`]
              )}
            ></div>
            {steps.map((v) => (
              <button
                key={v.id}
                className={cx(styles.steps, styles[`step_${v.id}`])}
                onClick={() => {
                  setDisplay({ fontsize: v.id });
                }}
              >
                <div
                  className={cx(
                    styles.circle,
                    display.fontsize === v.id && styles.active
                  )}
                ></div>
              </button>
            ))}
          </div>
        </div>
        <Text size="fs_19">Aa</Text>
      </div>
    </div>
  );
}
