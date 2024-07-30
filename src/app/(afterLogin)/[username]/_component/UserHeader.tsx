import style from '@/app/(afterLogin)/[username]/_style/profile.module.css';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import UserHeaderContent from './UserHeaderContent';

interface Props {
  username: string;
}

export default async function UserHeader({ username }: Props) {
  return (
    <div className={style.header}>
      <BackButton />
      <UserHeaderContent username={username} />
    </div>
  );
}
