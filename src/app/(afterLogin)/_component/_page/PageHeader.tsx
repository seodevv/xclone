import styles from './pageHeader.module.css';
import Text from '@/app/_component/_text/Text';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';

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
  return (
    <div
      className={styles.header}
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
