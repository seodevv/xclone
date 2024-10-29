import styles from './useridentifier.module.css';
import { AdvancedUser } from '@/model/User';
import BadgeButton from '@/app/(afterLogin)/_component/buttons/BadgeButton';
import Link from 'next/link';
import BadgeSvg from '@/app/_svg/verified/BadgeSvg';
import Text from '@/app/_component/_text/Text';

interface Props {
  sessionid?: string | null;
  username: string;
  user?: AdvancedUser;
}

export default function UserIdentifier({ sessionid, username, user }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.identifier}>
        <div className={styles.flex}>
          <div>{user ? user.nickname : '@' + decodeURIComponent(username)}</div>
          <BadgeButton verified={user?.verified} />
        </div>
        {user && <div className={styles.userid}>@{user.id} </div>}
      </div>
      {sessionid === username && !user?.verified && (
        <div className={styles.verified}>
          <Link
            className={styles.link}
            href="/i/premium_sign_up?type=verified"
            scroll={false}
          >
            <BadgeSvg
              type="blue"
              width={16}
              style={{ marginLeft: 0, marginRight: 4 }}
            />
            <Text text="Get verified" size="s" bold="bold" />
          </Link>
        </div>
      )}
    </div>
  );
}
