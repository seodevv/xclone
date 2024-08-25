import styles from './i.header.module.css';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';

interface Props {
  kind?: 'back' | 'xmark';
  noBack?: boolean;
  onClick?: () => void;
}

export default function IHeader({ kind = 'back', noBack, onClick }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.back}>
          {kind === 'back' && (
            <BackButton prevPath="/home" noBack={noBack} onClick={onClick} />
          )}
          {kind === 'xmark' && (
            <CloseButton prevPath="/home" noBack={noBack} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}
