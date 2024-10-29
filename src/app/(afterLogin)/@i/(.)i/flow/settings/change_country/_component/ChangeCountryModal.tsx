'use client';

import XLogoSvg from '@/app/_svg/logo/XLogoSvg';
import styles from './changeCountryModal.module.css';
import Text from '@/app/_component/_text/Text';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { useRouter } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function ChangeCountryModal() {
  const router = useRouter();
  const { alterMessage } = useAlterModal();
  const onClickChange = () => {
    alterMessage('This feature is in preparation.', 'warning');
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
          <Text className={styles.title} size="xxl" bold="bold">
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
            theme="white"
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
