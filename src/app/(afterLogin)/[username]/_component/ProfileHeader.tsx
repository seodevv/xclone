import style from '@/app/(afterLogin)/[username]/_style/profile.module.css';
import ProfileHeaderContent from './ProfileHeaderContent';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';

interface Props {
  username: string;
}

export default async function ProfileHeader({ username }: Props) {
  return (
    <div className={style.header}>
      <BackButton />
      <ProfileHeaderContent username={username} />
    </div>
  );
}
