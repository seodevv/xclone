import PageNotice from '@/app/(afterLogin)/_component/_page/PageNotice';
import utils from '@/app/utility.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bloccked accounts / XClone',
};

export default function SettingsBlockedImportedPage() {
  return (
    <div>
      <PageNotice
        title={'Block unwanted accounts'}
        sub={
          <>
            When you block someone, they won’t be able to follow or message you,
            and you won’t see notifications from them. You can import a list of
            accounts you want to block on X.&nbsp;
            <Link
              className={utils.link}
              href={'https://help.x.com/using-x/advanced-x-block-options'}
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
