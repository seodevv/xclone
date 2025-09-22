'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsMenus from '@/app/(afterLogin)/settings/_component/SettingsMenus';
import SettingsSearchForm from '@/app/(afterLogin)/settings/_component/SettingsSearchForm';
import { usePathname } from 'next/navigation';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

export default function SettingsLeftSection() {
  const pathname = usePathname();
  const { width } = useViewport();

  if (pathname !== '/settings' && width !== null && width < 1024) {
    return null;
  }

  return (
    <section
      className={cx(
        utils.flex_1,
        utils.w_100p,
        utils.w_max_600,
        utils.bd_1_solid_gray,
        utils.of_hide
      )}
    >
      <PageHeader title="Settings" noBack />
      <div
        className={cx(
          utils.d_flexColumn,
          utils.flex_justiStart,
          utils.w_100p,
          utils.bg_trans
        )}
      >
        <SettingsSearchForm />
        <SettingsMenus />
      </div>
    </section>
  );
}
