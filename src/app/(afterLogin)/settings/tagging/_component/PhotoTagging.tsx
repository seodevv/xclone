'use client';

import styles from './photoTagging.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import useSettingsLocalStore, {
  taggingSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function PhotoTagging() {
  const { tagging, setTagging } = useSettingsLocalStore(taggingSelector);
  const onChangeToggle = (value: boolean) => {
    setTagging(value ? 'anyone' : 'none');
  };
  const onChangeRadio = (value: string) => {
    if (value === 'anyone' || value === 'only') {
      setTagging(value);
    }
  };

  return (
    <div>
      <IdentifierToggle
        title="Photo tagging"
        sub="Allow people to tag you in their photos and receive notifications when they do so."
        defaultValue={tagging !== 'none'}
        onChange={onChangeToggle}
      />
      {tagging !== 'none' && (
        <div className={cx(styles.radio, utils.fadeIn)}>
          <IdentifierRadioBox
            name="tagging"
            data={[
              { id: 'anyone', title: 'Anyone can tag you' },
              { id: 'only', title: 'Only people you follow can tag you' },
            ]}
            defaultValue={tagging}
            noPad
            onChange={onChangeRadio}
          />
        </div>
      )}
    </div>
  );
}
