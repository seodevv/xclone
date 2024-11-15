import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import DataSharingWIthBusinessPartners from '@/app/(afterLogin)/settings/data_sharing_with_business_partners/_component/DataSharingWithBusinessPartners';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data sharing with business partners / XClone',
};

export default function SettingsDataSharingWithBusinessPartnersPage() {
  const header = 'Data sharing with business partners';
  const inform =
    'Allow sharing of additional information with X’s business partners.';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <DataSharingWIthBusinessPartners />
    </SettingsSubWrapper>
  );
}
