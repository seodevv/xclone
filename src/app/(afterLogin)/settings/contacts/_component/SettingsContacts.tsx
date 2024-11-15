'use client';

import useSettingsLocalStore, {
  ContactsSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsContacts() {
  const { contacts, setContacts } = useSettingsLocalStore(ContactsSelector);

  return (
    <div>
      <Text className={utils.p_basic} size="xl" bold="bold">
        Discoverability
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        Decide whether people who have your email address or phone number can
        find and connect with you on X.
      </Text>
      <IdentifierCheckBox
        title={'Let people who have your email address find you on X'}
        sub={
          <>
            Let people who have your email address find and connect with you on
            X.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/safety-and-security/email-and-phone-discoverability-settings'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noPad={false}
        noMargin
        defaultValue={contacts.email}
        onChange={(value) => setContacts({ email: value })}
      />
      <IdentifierCheckBox
        title={'Let people who have your phone number find you on X'}
        sub={
          <>
            Let people who have your phone number find and connect with you on
            X.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/safety-and-security/email-and-phone-discoverability-settings'
              }
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        noPad={false}
        noMargin
        defaultValue={contacts.phone}
        onChange={(value) => setContacts({ phone: value })}
      />
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        Contacts
      </Text>
      <Text className={utils.p_basic} size="xs" theme="gray">
        Manage contacts that you have imported from your mobile devices.&nbsp;
        <Link
          className={utils.link}
          href={
            'https://help.x.com/using-x/upload-your-contacts-to-search-for-friends'
          }
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
      <SettingsSubMenu
        type="link"
        href="/settings/contacts_dashboard"
        title="Manage contacts"
      />
    </div>
  );
}
