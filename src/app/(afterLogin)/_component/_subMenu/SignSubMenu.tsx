'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function SignSubMenu() {
  const router = useRouter();
  const { data: session } = useSession();
  const { close } = useContext(SubMenuContext);
  const { sendPrepareMessage } = useAlterModal();

  const onClickLogout = async () => {
    try {
      await signOut({ redirect: false });
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`, {
        method: 'post',
        credentials: 'include',
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubMenuWrapper position="top-right">
      <SubMenu
        type="div"
        title="Add an existing account"
        onClick={() => {
          sendPrepareMessage();
          close();
        }}
      />
      <SubMenu
        type="div"
        title={`Log out @${session?.user?.email}`}
        onClick={onClickLogout}
      />
    </SubMenuWrapper>
  );
}
