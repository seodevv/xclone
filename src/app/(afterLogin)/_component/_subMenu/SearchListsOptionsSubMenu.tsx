'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import ListsSvg from '@/app/_svg/post/ListsSvg';
import { useContext } from 'react';

interface Props {
  sessionid: string;
}

export default function SearchListsOptionsSubMenu({ sessionid }: Props) {
  const { close } = useContext(SubMenuContext);

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="link"
        href={`/${sessionid}/lists/memberships`}
        scroll={false}
        svg={<ListsSvg width={18.75} white />}
        title="Lists you're on"
        onClick={() => close()}
      />
    </SubMenuWrapper>
  );
}
