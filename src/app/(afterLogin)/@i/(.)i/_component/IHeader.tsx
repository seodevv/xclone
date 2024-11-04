'use client';

import styles from './i.header.module.css';
import CloseButton from '@/app/(afterLogin)/_component/buttons/CloseButton';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';

interface Props {
  type?: 'auto' | 'back';
  title?: string;
  prevPath?: string;
  noBack?: boolean;
  noBtn?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function IHeader({
  type = 'auto',
  title,
  prevPath = '/home',
  noBack,
  noBtn,
  onClick,
  children,
}: Props) {
  const stack = useHistoryStore((state) => state.stack);

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        {!noBtn && (
          <div className={styles.back}>
            {stack < -1 || type === 'back' ? (
              <BackButton
                prevPath={prevPath}
                width={20}
                noBack={noBack}
                onClick={onClick}
              />
            ) : (
              <CloseButton
                prevPath={prevPath}
                width={20}
                noBack={noBack}
                onClick={onClick}
              />
            )}
          </div>
        )}
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
