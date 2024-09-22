import UserPhotoSlot from '@/app/(afterLogin)/@modal/(.)[username]/photo/page';

interface Props {
  params: { username: string };
}

export default function UserPhotoPage({ params }: Props) {
  return <UserPhotoSlot params={params} />;
}
