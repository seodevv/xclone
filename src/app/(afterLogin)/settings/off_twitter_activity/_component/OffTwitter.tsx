'use client';

import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import useSettingsLocalStore, {
  personalizeSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function OffTwitter() {
  const { personalize, setPersonalize } =
    useSettingsLocalStore(personalizeSelector);
  const title = 'Personalize based on your inferred identity';
  const sub = (
    <>
      X will always personalize your experience based on information you’ve
      provided, as well as the devices you’ve used to log in. When this setting
      is enabled, X may also personalize based on other inferences about your
      identity, like devices and browsers you haven’t used to log in to X or
      email addresses and phone numbers similar to those linked to your X
      account.&nbsp;
      <Link
        className={utils.link}
        href={'https://help.x.com/about-personalization-across-your-devices'}
        target="_blank"
      >
        Learn more
      </Link>
    </>
  );

  return (
    <div>
      {/* <div className={utils.p_basic}> */}
      <IdentifierCheckBox
        title={title}
        sub={sub}
        defaultValue={personalize}
        onChange={(check) => setPersonalize(check)}
        noPad={false}
        noMargin
      />
      {/* </div> */}
    </div>
  );
}
