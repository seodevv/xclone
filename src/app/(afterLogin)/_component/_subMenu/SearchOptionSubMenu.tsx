'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useAlterModal from '@/app/_hooks/useAlterModal';
import SettingSvg from '@/app/_svg/navbar/SettingSvg';
import SearchSvg from '@/app/_svg/search/SearchSvg';
import { useContext } from 'react';

export default function SearchOptionSubmenu() {
  const { close } = useContext(SubMenuContext);
  const { sendPrepareMessage } = useAlterModal();
  const width = 20;

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="link"
        href="/settings/search"
        svg={<SettingSvg theme="theme" width={width} />}
        title="Search settings"
        onClick={() => {
          close();
        }}
      />
      <SubMenu
        type="div"
        svg={<SearchSvg theme="theme" width={width} />}
        title="Advanced search"
        onClick={() => {
          sendPrepareMessage();
          close();
        }}
      />
    </SubMenuWrapper>
  );
}
