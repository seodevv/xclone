import UserBannerSlot from '@/app/(afterLogin)/@modal/(.)[username]/header_photo/page';

interface Props {
  params: { username: string };
}

export default function UserBannerPage({ params }: Props) {
  return <UserBannerSlot params={params} />;
}
