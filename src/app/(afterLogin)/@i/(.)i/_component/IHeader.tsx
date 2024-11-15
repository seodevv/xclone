'use client';

import styles from './i.header.module.css';
import cx from 'classnames';
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
  align?: 'left' | 'center' | 'right';
  noMax?: boolean;
}

export default function IHeader({
  type = 'auto',
  title,
  prevPath = '/home',
  noBack,
  noBtn,
  onClick,
  children,
  align = 'center',
  noMax,
}: Props) {
  const stack = useHistoryStore((state) => state.stack);

  return (
    <div className={styles.header}>
      <div className={cx(styles.inner, noMax && styles.noMax)}>
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
            <div className={cx(styles.text, styles[`text_${align}`])}>
              <span>{title}</span>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
