'use client';

import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import styles from './changeCountryModal.module.css';
import Text from '@/app/_component/_text/Text';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { useRouter, useSearchParams } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function ChangeCountryModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { alterMessage } = useAlterModal();
  const setCountry = useSettingsLocalStore((state) => state.setCountry);
  const onClickChange = () => {
    const country = searchParams.get('country');
    if (country) {
      setCountry(country);
      alterMessage('Country updated');
      router.back();
    } else {
      alterMessage('Something is wrong. please try again', 'error');
    }
  };
  const onClickCancel = () => {
    router.back();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.logo}>
        <XLogoSvg width={48} />
      </div>
      <div className={styles.content}>
        <div className={styles.inform}>
          <Text className={styles.title} size="xxxl" bold="bold">
            Change country?
          </Text>
          <Text theme="gray">
            This will customize your X experience based on the country you live
            in.
          </Text>
        </div>
        <div>
          <FlexButton
            text="Change"
            theme="theme"
            large
            style={{ margin: 0 }}
            onClick={onClickChange}
          />
          <FlexButton
            text="Cancel"
            theme="reverse"
            large
            style={{ margin: '16px 0 0 0' }}
            onClick={onClickCancel}
          />
        </div>
      </div>
    </div>
  );
}
