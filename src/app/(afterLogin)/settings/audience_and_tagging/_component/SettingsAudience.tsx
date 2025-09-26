'use client';

import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import styles from './settingsAudience.module.css';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import useSettingsLocalStore, {
  AudienceSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

export default function SettingsAudience() {
  const { open, close } = useConfirmStore(confirmSelector);
  const { protectPost, protectVideo, setProtectPost, setProtectVideo } =
    useSettingsLocalStore(AudienceSelector);
  const checkBoxes: ICheckBox[] = [
    {
      id: 0,
      title: 'Protect your posts',
      sub: (
        <>
          When selected, your posts and other account information are only
          visible to people who follow you.&nbps;
          <Link
            href="https://help.x.com/ko/safety-and-security/public-and-protected-posts"
            target="_blank"
          >
            Learn more
          </Link>
        </>
      ),
      defaultValue: protectPost,
      onCheck: (check) => {
        open({
          flag: true,
          title: 'Protect your posts?',
          sub: 'This will make them visible only to your X followers.',
          btnText: 'Protect',
          onClickCancle: () => {
            close();
          },
          onClickConfirm: () => {
            setProtectPost(check);
            close();
          },
        });
      },
      onUnCheck: (check) => {
        setProtectPost(check);
      },
    },
    {
      id: 1,
      title: 'Protect your videos',
      sub: (
        <>
          If selected, videos in your posts will not be downloadable by default.
          This setting applies to posts going forward and is not
          retroactive&nbsp;
          <Link href="https://help.x.com/ko/using-x/x-videos" target="_blank">
            Learn more
          </Link>
        </>
      ),
      defaultValue: protectVideo,
      onCheck: (check) => {
        setProtectVideo(check);
      },
      onUnCheck: (check) => {
        setProtectVideo(check);
      },
    },
  ];
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 2,
      type: 'link',
      href: '/settings/tagging',
      title: 'Photo tagging',
      sub: 'Anyone can tag you',
    },
  ];
  return (
    <div>
      {checkBoxes.map((checkBox, i) => (
        <div key={checkBox.id} className={styles.padding}>
          <IdentifierCheckBox
            title={checkBox.title}
            sub={checkBox.sub}
            defaultValue={checkBox.defaultValue}
            onCheck={checkBox.onCheck}
            onUnCheck={checkBox.onUnCheck}
          />
        </div>
      ))}
      {subMenus.map((menu) => (
        <SettingsSubMenu
          key={menu.id}
          type={menu.type}
          href={menu.href}
          svg={menu.svg}
          title={menu.title}
          sub={menu.sub}
          external={menu.external}
          select={menu.select}
          arrow={menu.arrow}
          onClick={menu.onClick}
        />
      ))}
    </div>
  );
}
