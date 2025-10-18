'use client';

import styles from './pageHeader.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import useMobileHeader from '@/app/_hooks/useMobileHeader';

interface Props {
  title?: string;
  sub?: string;
  noBack?: boolean;
  height?: number;
  prevPath?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  sub,
  noBack,
  height = 53,
  prevPath = '/home',
  children,
}: Props) {
  const { dir, transitClass } = useMobileHeader();

  return (
    <div
      className={cx(styles.header, transitClass, dir === 'down' && styles.hide)}
      style={{
        height,
      }}
    >
      {!noBack && <BackButton prevPath={prevPath} />}
      {title && (
        <div className={styles.title}>
          <Text text={title} theme="theme" size="xl" bold="bold" />
          {sub && <Text text={sub} theme="gray" size="xs" />}
        </div>
      )}
      {children}
    </div>
  );
}
