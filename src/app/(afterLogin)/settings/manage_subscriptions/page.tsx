import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import ManageSubscription from '@/app/(afterLogin)/settings/manage_subscriptions/_component/ManageSubscription';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creator Subscriptions / XClone',
};

export default function SettingsManageSubscriptionPage() {
  return (
    <SettingsSubWrapper header="Creator Subscriptions">
      <ManageSubscription />
    </SettingsSubWrapper>
  );
}
