'use client';

import PageNotice from '@/app/(afterLogin)/_component/_page/PageNotice';
import useSettingsLocalStore, {
  PushNotificationPermissionSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import PushNotificationsOptionsFromX from '@/app/(afterLogin)/settings/push_notifications/_component/PushNotificationsOptionsFromX';
import PushNotificationsOptionsFromXRelatedPosts from '@/app/(afterLogin)/settings/push_notifications/_component/PushNotificationsOptionsFromXRelatedPosts';
import PushNotificationsOptionsXProfessionals from '@/app/(afterLogin)/settings/push_notifications/_component/PushNotificationsOptionsXProfessionals';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import { useEffect } from 'react';

export default function SettingsPushNotifications() {
  const { permission, setPermissions } = useSettingsLocalStore(
    PushNotificationPermissionSelector
  );

  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    if (!('permission' in window.Notification)) return;
    // if (window.Notification.permission !== 'default') return;
    const permission = window.Notification.permission;
    switch (permission) {
      case 'default':
        const response = await window.Notification.requestPermission();
        setPermissions(response);
        break;
      case 'denied':
        setPermissions('denied');
        break;
      case 'granted':
        setPermissions('granted');
        break;
    }
  };

  useEffect(() => {
    if ('Notification' in window) {
      if ('permission' in Notification) {
        if (
          window.Notification.permission !== 'granted' ||
          permission !== 'default'
        ) {
          setPermissions(window.Notification.permission);
        }
      }
    }
  }, [setPermissions]);

  return (
    <div>
      {permission !== 'denied' && (
        <IdentifierToggle
          title={'Push notifications'}
          sub={
            'Get push notifications to find out what’s going on when you’re not on X. You can turn them off anytime.'
          }
          defaultValue={permission === 'granted'}
          onToggleOn={requestPermission}
          onToogleOff={() => {
            setPermissions('default');
          }}
        />
      )}
      {permission === 'default' && (
        <PageNotice
          title={'Turn on push notifications'}
          sub={
            'To receive notifications as they happen, turn on push notifications. You’ll also receive them when you’re not on X. Turn them off anytime.'
          }
          btnText="Turn on"
          onClick={requestPermission}
        />
      )}
      {permission === 'denied' && (
        <PageNotice
          title={'Turn on notifications?'}
          sub={
            'To get notifications from X, you’ll need to allow them in your browser settings first.'
          }
        />
      )}
      {permission === 'granted' && (
        <>
          <PushNotificationsOptionsFromXRelatedPosts />
          <PushNotificationsOptionsFromX />
          <PushNotificationsOptionsXProfessionals />
        </>
      )}
    </div>
  );
}
