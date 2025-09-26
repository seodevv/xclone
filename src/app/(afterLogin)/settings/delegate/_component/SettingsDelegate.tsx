'use client';

import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import useSettingsLocalStore, {
  delegateSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import IdentifierRadioBox from '@/app/_component/_input/IdentifierRadioBox';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import utils from '@/app/utility.module.css';
import Link from 'next/link';

export default function SettingsDelegate() {
  const { open, close } = useConfirmStore(confirmSelector);
  const { delegate, setDelegate } = useSettingsLocalStore(delegateSelector);
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/delegate/groups',
      title: 'Accounts delegated to you',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/delegate/members',
      title: 'Members you’ve delegated',
    },
  ];
  const onToggleOn = () => {
    setDelegate('anyone');
  };
  const onToggleOff = () => {
    open({
      flag: true,
      title: 'Don’t allow others to invite you to their account?',
      sub: 'In the future, you won’t receive invites to other delegations. You’ll still be able to access your existing delegations.',
      btnText: 'Don’t allow',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        setDelegate('none');
        close();
      },
    });
  };
  const onChangeRadio = (value: string) => {
    if (value === 'anyone' || value === 'only') {
      setDelegate(value);
    }
  };

  return (
    <div>
      <IdentifierToggle
        title="Allow others to invite you to their account"
        sub={
          <>
            When this setting is on, people can invite you to share their
            account.&nbsp;
            <Link
              className={utils.link}
              href="https://help.x.com/managing-your-account/how-to-use-the-delegate-feature"
              target="_blank"
            >
              Learn more
            </Link>
          </>
        }
        defaultValue={delegate !== 'none'}
        onToggleOn={onToggleOn}
        onToogleOff={onToggleOff}
      />
      {delegate !== 'none' && (
        <div>
          <DivideLine />
          <IdentifierRadioBox
            name="delegate"
            data={[
              { id: 'anyone', title: 'Allow anyone to invite you' },
              {
                id: 'only',
                title: 'Only allow people you follow to invite you',
              },
            ]}
            defaultValue={delegate}
            onChange={onChangeRadio}
          />
        </div>
      )}
      <DivideLine />
      <Text className={utils.p_basic} size="xl" bold="bold">
        Your delegations
      </Text>
      {subMenus.map((v) => (
        <SettingsSubMenu
          key={v.id}
          type={v.type}
          href={v.href}
          title={v.title}
        />
      ))}
    </div>
  );
}
