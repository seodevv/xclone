import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenu from '@/app/(afterLogin)/settings/_component/SettingsMenu';

export default function SettingsAboutReleaseNotes() {
  const title = 'Release notes';
  return (
    <>
      <PageHeader title={title} height={48} noBack />
      <SettingsMenu
        path="https://x.com/i/release_notes"
        text="Release notes"
        external
      />
    </>
  );
}
