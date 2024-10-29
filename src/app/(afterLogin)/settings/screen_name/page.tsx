import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import SettingsScreenName from '@/app/(afterLogin)/settings/screen_name/_component/SettingsScreenName';

export default function SettingsScreenNamePage() {
  const header = 'Change username';

  return (
    <MyProfileHydrationBoundary>
      <SettingSubWrapper
        header={header}
        noBack={false}
        prevPath="/settings/your_twitter_data/account"
      >
        <SettingsScreenName />
      </SettingSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
