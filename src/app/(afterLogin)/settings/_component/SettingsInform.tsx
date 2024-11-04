import styles from './settings.inform.module.css';
import Text from '@/app/_component/_text/Text';

interface Props {
  inform: string | JSX.Element;
}

export default function SettingsInform({ inform }: Props) {
  return (
    <div className={styles.inform}>
      <Text theme="gray" size="xs">
        {inform}
      </Text>
    </div>
  );
}
