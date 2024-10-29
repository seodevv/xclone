import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';
import SettingSubWrapper from '@/app/(afterLogin)/settings/_component/SettingSubWrapper';
import SettingsEmail from '@/app/(afterLogin)/settings/email/_component/SettingsEmail';

export default function SettingsEmailPage() {
  const header = 'Change email';
  return (
    <MyProfileHydrationBoundary>
      <SettingSubWrapper header={header} noBack={false}>
        <SettingsEmail />
      </SettingSubWrapper>
    </MyProfileHydrationBoundary>
  );
}
