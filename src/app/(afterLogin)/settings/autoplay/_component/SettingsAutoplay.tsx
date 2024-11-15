'use client';

import utils from '@/app/utility.module.css';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import Link from 'next/link';
import useSettingsLocalStore, {
  DataSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsAutoplay() {
  const { data, setData } = useSettingsLocalStore(DataSelector);

  return (
    <div>
      <IdentifierRadioBox
        name="autoplay"
        title="Autoplay"
        sub={
          <>
            Select whether videos and GIFs should play automatically on this
            device.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/x-videos'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        data={[
          {
            id: 'cellular',
            title: 'On cellular of Wi-Fi',
          },
          {
            id: 'never',
            title: 'Never',
          },
        ]}
        defaultValue={data.autoplay}
        onChange={(value) => {
          if (value === 'cellular' || value === 'never') {
            setData({ autoplay: value });
          }
        }}
      />
    </div>
  );
}
