'use client';

import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsLink from '@/app/(afterLogin)/_component/Link/SettingsLink';

export default function ITrendsHeader() {
  return (
    <>
      <PageHeader title="Trends">
        <SettingsLink href="/settings/trends" />
      </PageHeader>
    </>
  );
}
