import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';
import Link from 'next/link';
import PlusSvg from '@/app/_svg/tweet/PlusSvg';
import SettingsMutedKeyword from '@/app/(afterLogin)/settings/muted_keywords/_component/SettingsMutedKeyword';

export const metadata: Metadata = {
  title: 'Muted words / XClone',
};

export default function SettingsMutedKeywordsPage() {
  const header = 'Muted words';
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper
      header={header}
      noBack={false}
      prevPath={prevPath}
      option={
        <Link className={utils.addOn} href={'/settings/add_muted_keyword'}>
          <PlusSvg width={20} white />
        </Link>
      }
    >
      <SettingsMutedKeyword />
    </SettingsSubWrapper>
  );
}
