import utils from '@/app/utility.module.css';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import { Metadata } from 'next';
import Link from 'next/link';
import SettingsLocation from '@/app/(afterLogin)/settings/location/_component/SettingsLocation';

export const metadata: Metadata = {
  title: 'Add location information to your posts / XClone',
};

export default function SettingsLocationPage() {
  const header = 'Add location information to your posts';
  const inform = (
    <>
      If enabled, you will be able to attach location information to your
      posts.&nbsp;
      <Link
        className={utils.link}
        href={'https://help.x.com/safety-and-security/post-location-settings'}
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const prevPath = '/settings/privacy_and_safety';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} />
      <SettingsLocation />
    </SettingsSubWrapper>
  );
}
