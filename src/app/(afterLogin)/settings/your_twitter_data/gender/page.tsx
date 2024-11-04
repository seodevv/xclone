import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Text from '@/app/_component/_text/Text';
import YourgenderSelector from '@/app/(afterLogin)/settings/your_twitter_data/gender/_component/YourgenderSelector';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gender / XClone',
};

export default function SettingsYourGenderPage() {
  const header = 'Gender';
  const sub =
    'If you haven’t already specified a gender, this is the one associated with your account based on your profile and activity. This information won’t be displayed publicly.';
  return (
    <SettingsSubWrapper
      header={header}
      noBack={false}
      prevPath="/settings/account"
    >
      <Text className={utils.p_basic} theme="gray">
        {sub}
      </Text>
      <YourgenderSelector />
    </SettingsSubWrapper>
  );
}
