'use client';

import useSettingsLocalStore, {
  SettingsLocalStore,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import styles from './settingsAccount.information.module.css';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import DivideLine from '@/app/_component/_util/DivideLine';
import { MONTH_EN } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import Link from 'next/link';
import { useState } from 'react';
import SettingsAccountAutomation from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsAccountAutomation';

interface Props {
  user: AdvancedUser;
  gender: SettingsLocalStore['gender'];
}

export default function SettingsAccountInformation({ user, gender }: Props) {
  const [automation, setAutomation] = useState(false);
  const country = useSettingsLocalStore((state) => state.country);

  const first: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/screen_name',
      title: 'Username',
      sub: `@${user.id}`,
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/phone',
      title: 'Phone',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/email',
      title: 'Email',
      sub: `${user.id}@xclone.com`,
    },
    {
      id: 3,
      type: 'button',
      title: 'Verified',
      sub: (
        <span>
          No.&nbsp;
          <Link
            className={styles.link}
            href="https://help.x.com/ko/managing-your-account/about-x-verified-accounts"
            target="_blank"
          >
            Learn more
          </Link>
        </span>
      ),
      select: 'none',
      arrow: 'none',
    },
  ];

  const second: ISettingsSubMenu[] = [
    {
      id: 4,
      type: 'link',
      href: '/settings/audience_and_tagging',
      title: 'Protected posts',
      sub: 'No',
    },
    {
      id: 5,
      type: 'button',
      title: 'Account creation',
      sub: (
        <>
          <span>{`${MONTH_EN[new Date(user.regist).getMonth()]} ${new Date(
            user.regist
          ).getDate()}, ${new Date(user.regist).getFullYear()}, ${new Date(
            user.regist
          ).toLocaleTimeString('en')}`}</span>
          <br />
          <span>Soute Korea</span>
        </>
      ),
      select: 'none',
      arrow: 'none',
    },
  ];

  const third: ISettingsSubMenu[] = [
    {
      id: 6,
      type: 'link',
      href: '/settings/country',
      title: 'Country',
      sub: country ? country : 'South Korea',
    },
    {
      id: 7,
      type: 'link',
      href: '/settings/languages',
      title: 'Languages',
      sub: 'English, Korean, No linguistic content',
    },
    {
      id: 8,
      type: 'link',
      href: '/settings/your_twitter_data/gender',
      title: 'Gender',
      sub: gender.type !== 'other' ? gender.type : gender.other,
    },
    {
      id: 9,
      type: 'button',
      title: 'Birth date',
      sub: (
        <>
          {user.birth?.date && (
            <>
              <span>
                {`${MONTH_EN[new Date(user.birth.date).getMonth()]} ${new Date(
                  user.birth.date
                ).getDate()}, ${new Date(user.birth.date).getFullYear()}`}
              </span>
              <br />
            </>
          )}
          <span>
            Add your date of birth to your{' '}
            <Link className={styles.link} href="/i/profile">
              profile
            </Link>
            .
          </span>
        </>
      ),
      select: 'none',
      arrow: 'none',
    },
  ];

  const fourth: ISettingsSubMenu[] = [
    {
      id: 10,
      type: 'link',
      href: '/settings/your_twitter_data/age',
      title: 'Age',
      sub: user.birth?.date
        ? `${Math.round(
            (new Date().getTime() - new Date(user.birth.date).getTime()) /
              1000 /
              60 /
              60 /
              24 /
              365
          )}`
        : '13-54',
    },
    {
      id: 11,
      type: 'button',
      title: 'Automation',
      sub: 'Manage your automated account.',
      onClick: () => {
        setAutomation(true);
      },
    },
  ];

  return (
    <>
      {first.map((m) => (
        <SubMenu key={m.id} m={m} />
      ))}
      <DivideLine />
      {second.map((m) => (
        <SubMenu key={m.id} m={m} />
      ))}
      <DivideLine />
      {third.map((m) => (
        <SubMenu key={m.id} m={m} />
      ))}
      <DivideLine />
      {fourth.map((m) => (
        <SubMenu key={m.id} m={m} />
      ))}
      {automation && (
        <SettingsAccountAutomation
          active={automation}
          unActive={() => setAutomation(false)}
        />
      )}
    </>
  );
}

function SubMenu({ m }: { m: ISettingsSubMenu }) {
  return (
    <SettingsSubMenu
      key={m.id}
      type={m.type}
      href={m.href}
      svg={m.svg}
      title={m.title}
      sub={m.sub}
      external={m.external}
      select={m.select}
      arrow={m.arrow}
      onClick={m.onClick}
    />
  );
}
