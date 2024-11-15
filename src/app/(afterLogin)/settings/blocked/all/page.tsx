import utils from '@/app/utility.module.css';
import Link from 'next/link';
import { Metadata } from 'next';
import PageNotice from '@/app/(afterLogin)/_component/_page/PageNotice';

export const metadata: Metadata = {
  title: 'Bloccked accounts / XClone',
};

export default function SettingBlockedAllPage() {
  return (
    <div>
      <PageNotice
        title={'Block unwanted accounts'}
        sub={
          <>
            When you block someone, they won’t be able to follow or message you,
            and you won’t see notifications from them.&nbsp;
            <Link
              className={utils.link}
              href={
                'https://help.x.com/using-x/blocking-and-unblocking-accounts'
              }
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
