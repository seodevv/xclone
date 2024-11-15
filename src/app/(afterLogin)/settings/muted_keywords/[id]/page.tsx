import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsMutedWord from '@/app/(afterLogin)/settings/muted_keywords/_component/SettingsMutedWord';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export const metdata: Metadata = {
  title: 'Muted word options / XClone',
};

export default function SettingsMutedWordOptionsPage({ params }: Props) {
  const header = 'Muted word options';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsMutedWord mode="edit" id={params.id} />
    </SettingsSubWrapper>
  );
}
