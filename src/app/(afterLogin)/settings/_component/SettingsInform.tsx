import DivideLine from '@/app/_component/_util/DivideLine';
import styles from './settings.inform.module.css';
import Text from '@/app/_component/_text/Text';

interface Props {
  inform: string | JSX.Element;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl' | 'fs_34';
  divideLine?: boolean;
}

export default function SettingsInform({
  inform,
  size = 'xs',
  divideLine,
}: Props) {
  return (
    <>
      <div className={styles.inform}>
        <Text theme="gray" size={size}>
          {inform}
        </Text>
      </div>
      {divideLine && <DivideLine />}
    </>
  );
}
