import utils from '@/app/utility.module.css';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import Link from 'next/link';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import { Metadata } from 'next';
import Text from '@/app/_component/_text/Text';

export const metadata: Metadata = {
  title: 'Inferred interests from partners / XClone',
};

export default function SettingsYourPartnerInterestsPage() {
  const header = 'Inferred interests from partners';
  const inform = (
    <>
      X’s partners build audiences around shopping decisions, lifestyle, and
      other online and offline behaviors.&nbsp;
      <Link
        className={utils.link}
        href={'https://help.x.com/interests-from-x-partners'}
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );
  const prevPath = '/settings/account';
  return (
    <SettingsSubWrapper header={header} noBack={false} prevPath={prevPath}>
      <SettingsInform inform={inform} size="m" divideLine />
      <div className={utils.p_basic}>
        <Text size="xl" align="center">
          Nothing to see here — yet
        </Text>
        <Text size="xs" theme="gray" align="center">
          It may take a while to gather this information. Try again later.
        </Text>
      </div>
    </SettingsSubWrapper>
  );
}
