'use client';

import useSettingsLocalStore, {
  SpacesSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsSpaces() {
  const { spaces, setSpaces } = useSettingsLocalStore(SpacesSelector);

  return (
    <div>
      <IdentifierToggle
        title={'Allow followers to see which Spaces you’re listening to'}
        sub={
          <>
            Keep in mind that even with this setting turned off you will be
            visible to everyone when you’re in a Space. Your followers can
            always see what Spaces you’re hosting, co-hosting or speaking
            in.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/spaces'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        defaultValue={spaces}
        onChange={(value) => {
          setSpaces(value);
        }}
      />
    </div>
  );
}
