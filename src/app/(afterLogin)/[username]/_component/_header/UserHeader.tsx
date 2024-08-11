import style from './userHeader.module.css';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import UserHeaderTitle from './UserHeaderTitle';

interface Props {
  username: string;
}

export default async function UserHeader({ username }: Props) {
  return (
    <div className={style.header}>
      <BackButton />
      <UserHeaderTitle username={username} />
    </div>
  );
}
