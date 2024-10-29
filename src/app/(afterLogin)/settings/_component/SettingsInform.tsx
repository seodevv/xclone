import styles from './settings.inform.module.css';
import Text from '@/app/_component/_text/Text';

interface Props {
  inform: string;
}

export default function SettingsInform({ inform }: Props) {
  return (
    <div className={styles.inform}>
      <Text text={inform} theme="gray" size="xs" />
    </div>
  );
}
