'use client';

import useGetRoomsNotifications from '@/app/(afterLogin)/_hooks/useGetRoomsNotifications';
import styles from './navMenu.module.css';

export default function NavMessagesBadge() {
  const { data: notifications } = useGetRoomsNotifications();
  const count =
    notifications?.data.reduce((acc, cur) => acc + cur.Notifications, 0) || 0;

  if (count === 0) {
    return null;
  }

  return (
    <div className={styles.badge}>
      <span>{count}</span>
    </div>
  );
}
