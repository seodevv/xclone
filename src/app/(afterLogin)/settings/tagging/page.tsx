import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import PhotoTagging from '@/app/(afterLogin)/settings/tagging/_component/PhotoTagging';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo tagging / XClone',
};

export default function SettingsTaggingPage() {
  const header = 'Photo tagging';
  return (
    <SettingsSubWrapper header={header} noBack={false}>
      <PhotoTagging />
    </SettingsSubWrapper>
  );
}
