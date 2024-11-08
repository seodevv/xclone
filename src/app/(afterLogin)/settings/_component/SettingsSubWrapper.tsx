import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import styles from './settings.sub.module.css';

interface Props {
  header: string;
  noBack?: boolean;
  prevPath?: string;
  children?: React.ReactNode;
}

export default function SettingsSubWrapper({
  header,
  noBack = true,
  prevPath,
  children,
}: Props) {
  return (
    <div className={styles.sub}>
      <PageHeader title={header} noBack={noBack} prevPath={prevPath} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
