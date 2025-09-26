'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';

export default function SignSubMenu() {
  const { data: session } = useSession();
  const { close: closeMenu, hide } = useContext(SubMenuContext);
  const { open, close: closeConfirm } = useConfirmStore(confirmSelector);
  const { sendPrepareMessage } = useAlterModal();

  const onClickAdd = () => {
    sendPrepareMessage();
    closeMenu();
  };

  const onClickLogout = () => {
    hide(true);

    open({
      flag: true,
      x: true,
      title: 'Log out of X?',
      sub: 'You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.',
      btnText: 'Log out',
      btnTheme: 'theme',
      onClickCancle: () => {
        closeMenu();
        closeConfirm();
      },
      onClickConfirm: async () => {
        await logout();
      },
    });
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`, {
        method: 'post',
        credentials: 'include',
      });
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubMenuWrapper position="top-right">
      <SubMenu
        type="div"
        title="Add an existing account"
        onClick={onClickAdd}
      />
      <SubMenu
        type="div"
        title={`Log out @${session?.user?.email}`}
        onClick={onClickLogout}
      />
    </SubMenuWrapper>
  );
}
