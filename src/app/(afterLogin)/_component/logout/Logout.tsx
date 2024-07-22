import style from './logout.module.css';
import { Session } from 'next-auth';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import LogoutButton from './LogoutButton';

interface Props {
  session: Session | null;
}

export default async function Logout({ session }: Props) {
  if (!session || !session.user) {
    return null;
  }

  return (
    <LogoutButton>
      <div className={style.logOutUserImage}>
        {session.user.image && (
          <Image
            src={generateImagePath(session.user.image)}
            alt={session.user.email as string}
            width={50}
            height={50}
          />
        )}
      </div>
      <div className={style.logOutUserName}>
        <div>{session.user.name}</div>
        <div>@{session.user.email}</div>
      </div>
    </LogoutButton>
  );
}
