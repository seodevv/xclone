import UserPhoto from '@/app/(afterLogin)/@modal/(.)[username]/photo/_component/UserPhoto';
import UserPhotoBackground from '@/app/(afterLogin)/@modal/(.)[username]/photo/_component/UserPhotoBackground';
import SingleUserHydrationBoundary from '@/app/(afterLogin)/@settings/(.)settings/profile/_boundaray/SingleUserHydrationBoundary';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';

interface Props {
  params: { username: string };
}

export default function UserBannerSlot({ params }: Props) {
  return (
    <SingleUserHydrationBoundary username={params.username}>
      <UserPhotoBackground username={params.username}>
        <HtmlOverflowHidden />
        <UserPhoto mode="banner" username={params.username} />
      </UserPhotoBackground>
    </SingleUserHydrationBoundary>
  );
}
