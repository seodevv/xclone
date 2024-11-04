import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function SessionDateTime() {
  const title = 'Date and time';
  const sub = 'Active now';
  return (
    <div>
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        {title}
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        {sub}
      </Text>
    </div>
  );
}
