import styles from './userProfile.module.css';
import { AdvancedUser } from '@/model/User';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';

interface Props {
  username: string;
  user?: AdvancedUser;
}

export default function UserIdentifier({ username, user }: Props) {
  return (
    <div>
      <div className={styles.identifier}>
        {user ? user.nickname : '@' + decodeURIComponent(username)}
        <BadgeButton badge={user?.verified} />
      </div>
      {user && <div className={styles.userId}>@{user.id} </div>}
    </div>
  );
}
