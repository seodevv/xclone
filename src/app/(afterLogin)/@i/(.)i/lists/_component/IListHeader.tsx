'use client';

import styles from './i.list.header.module.css';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import TextButton from '@/app/(afterLogin)/_component/buttons/TextButton';

interface Props {
  title?: string;
  btnText?: string;
  disabled?: boolean;
  noBtn?: boolean;
  onClickXMark?: () => void;
  onClick?: () => void;
}

export default function IListHeader({
  title,
  btnText = 'Save',
  disabled,
  noBtn,
  onClickXMark,
  onClick,
}: Props) {
  return (
    <IHeader onClick={onClickXMark}>
      <div className={styles.middle}>
        {title && (
          <div className={styles.title}>
            <span>{title}</span>
          </div>
        )}
      </div>
      {!noBtn && (
        <div className={styles.save}>
          <TextButton
            theme="theme"
            text={btnText}
            disabled={disabled}
            onClick={onClick}
          />
        </div>
      )}
    </IHeader>
  );
}
