'use client';

import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import useAlterModal from '@/app/_hooks/useAlterModal';
import SubscriptionSvg from '@/app/_svg/_settings/SubscriptionSvg';

export default function ManageSubscription() {
  const { alterMessage } = useAlterModal();

  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'button',
      svg: <SubscriptionSvg />,
      title: 'Manage Creator Subscriptions',
      sub: 'View and manage your subscriptions to creators below using Stripe. Any active subscriptions you initiated on iOS or Android can be managed in the app.',
      external: true,
      onClick: () => alterMessage('You don’t have any Subscriptions yet'),
    },
  ];

  return subMenus.map((sub) => (
    <SettingsSubMenu
      key={sub.id}
      type={sub.type}
      href={sub.href}
      svg={sub.svg}
      title={sub.title}
      sub={sub.sub}
      external={sub.external}
      onClick={sub.onClick}
    />
  ));
}
