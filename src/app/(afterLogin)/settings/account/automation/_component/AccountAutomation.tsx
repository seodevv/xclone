'use client';

import utils from '@/app/utility.module.css';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountAutomation() {
  const router = useRouter();
  return (
    <div>
      <SettingsSubMenu
        type="button"
        title="Set up account automation"
        sub={
          <>
            Connect a managing account so your automated account receives an
            automated account label. All automated accounts must be connected to
            a managing account.&nbsp;
            <Link
              className={utils.link}
              href="https://help.x.com/ko/using-x/automated-account-labels"
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Learn more
            </Link>
          </>
        }
        onClick={() => {
          router.push('/i/flow/enable_automated_account');
        }}
      />
    </div>
  );
}
