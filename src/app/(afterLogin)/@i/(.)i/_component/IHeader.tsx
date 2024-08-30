import styles from './i.header.module.css';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';

interface Props {
  kind?: 'back' | 'xmark';
  title?: string;
  noBack?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function IHeader({
  kind = 'back',
  title,
  noBack,
  onClick,
  children,
}: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.back}>
          {kind === 'back' && (
            <BackButton
              prevPath="/home"
              width={20}
              noBack={noBack}
              onClick={onClick}
            />
          )}
          {kind === 'xmark' && (
            <CloseButton
              prevPath="/home"
              width={20}
              noBack={noBack}
              onClick={onClick}
            />
          )}
        </div>
        {title && (
          <div className={styles.title}>
            <div className={styles.text}>
              <span>{title}</span>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
