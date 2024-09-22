import UserPhoto from '@/app/(afterLogin)/@modal/(.)[username]/photo/_component/UserPhoto';
import UserPhotoBackground from '@/app/(afterLogin)/@modal/(.)[username]/photo/_component/UserPhotoBackground';
import SingleUserHydrationBoundary from '@/app/(afterLogin)/@settings/(.)settings/profile/_boundaray/SingleUserHydrationBoundary';

interface Props {
  params: { username: string };
}

export default function UserPhotoSlot({ params }: Props) {
  return (
    <SingleUserHydrationBoundary username={params.username}>
      <UserPhotoBackground username={params.username}>
        <UserPhoto mode="image" username={params.username} />
      </UserPhotoBackground>
    </SingleUserHydrationBoundary>
  );
}
