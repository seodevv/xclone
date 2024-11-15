'use client';

import useSettingsLocalStore, {
  AllowBusinessPartnersSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function DataSharingWIthBusinessPartners() {
  const { allowBusinessPartners, setAllowBusinessPartners } =
    useSettingsLocalStore(AllowBusinessPartnersSelector);

  return (
    <div>
      <IdentifierCheckBox
        title={'Allow additional information sharing with business partners'}
        sub={
          <>
            X always shares information with business partners as a way to run
            and improve its products. When enabled, this allows X to share
            additional information with those partners to help support running
            X’s business, including making X’s marketing activities on other
            sites and apps more relevant for you.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/safety-and-security/data-through-partnerships'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noPad={false}
        defaultValue={allowBusinessPartners}
        onChange={(value) => setAllowBusinessPartners(value)}
      />
    </div>
  );
}
