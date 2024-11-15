import utils from '@/app/utility.module.css';
import PageNotice from '@/app/(afterLogin)/_component/_page/PageNotice';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muted accounts / XClone',
};

export default function SettingsMutedAllPage() {
  return (
    <div>
      <PageNotice
        title={'Muted accounts'}
        sub={
          <>
            Posts from muted accounts won’t show up in your Home timeline. Mute
            accounts directly from their profile or post.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/x-mute'}
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
      />
    </div>
  );
}
