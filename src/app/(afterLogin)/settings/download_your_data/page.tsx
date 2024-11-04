import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import DownloadFlow from '@/app/(afterLogin)/settings/download_your_data/_component/DownloadFlow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download an archive of your data / XClone',
};

export default function SettingsDownloadYourDataPage() {
  const header = 'Download an archive of your data';
  const inform =
    'Get insights into the type of information stored for you account.';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <SettingsInform inform={inform} />
      <DownloadFlow />
    </SettingsSubWrapper>
  );
}
