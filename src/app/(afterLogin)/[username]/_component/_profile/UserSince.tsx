import styles from './userSince.module.css';
import { MONTH_EN } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import UserBirth from '@/app/(afterLogin)/[username]/_component/_profile/UserBirth';
import { Session } from 'next-auth';
import UserAdditional from '@/app/(afterLogin)/[username]/_component/_profile/UserAdditional';

interface Props {
  session: Session | null;
  user?: AdvancedUser;
}

export default function UserSince({ session, user }: Props) {
  if (!user) return;

  return (
    <div className={styles.userSince}>
      {user.location && (
        <UserAdditional type="div" icon="location" text={user.location} />
      )}
      {user.refer && (
        <UserAdditional
          type="link"
          href={user.refer}
          icon="refer"
          text={user.refer}
        />
      )}
      {user.birth && <UserBirth sessionid={session?.user?.email} user={user} />}
      {user.regist && (
        <UserAdditional
          type="div"
          icon="calendar"
          text={`Joined ${
            MONTH_EN[new Date(user.regist).getMonth()]
          } ${new Date(user.regist).getFullYear()}`}
        />
      )}
    </div>
  );
}
