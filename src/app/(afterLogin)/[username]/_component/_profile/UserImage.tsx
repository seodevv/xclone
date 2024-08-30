import styles from './userProfile.module.css';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { Session } from 'next-auth';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import MessageButton from '@/app/(afterLogin)/_component/buttons/MessageButton';

interface Props {
  session?: Session | null;
  user?: AdvancedUser;
}

export default function UserImage({ session, user }: Props) {
  const isMyProfile = session?.user?.email === user?.id;

  return (
    <div className={styles.userImage}>
      <div className={styles.imageBox}>
        {user && (
          <Image
            src={generateImagePath(user.image)}
            alt={user.id}
            width={145}
            height={145}
          />
        )}
      </div>
      {user && (
        <div className={styles.userAction}>
          {isMyProfile ? (
            <TextLink
              theme="reverse"
              text="Edit profile"
              href="/settings/profile"
            />
          ) : (
            <>
              <MessageButton />
              <FollowButton user={user} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
