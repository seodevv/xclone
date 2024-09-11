'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

export default function SearchListsOptionsSubMenu() {
  const { data: session } = useSession();
  const { dispatchMenu } = useContext(SubMenuContext);

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="link"
        href={`/${session?.user?.email}/lists/memberships`}
        scroll={false}
        svg={<ListsSvg width={18.75} white />}
        title="Lists you're on"
        onClick={() => dispatchMenu({ type: 'reset' })}
      />
    </SubMenuWrapper>
  );
}
