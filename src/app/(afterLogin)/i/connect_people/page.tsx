import FollowRecommendsHydrationBoundary from '@/app/(afterLogin)/_boundary/FollowRecommendsHydrationBoundary';
import ConnectPeople from '@/app/(afterLogin)/i/connect_people/_component/ConnectPeople';
import ConnectPeopleHeader from '@/app/(afterLogin)/i/connect_people/_component/ConnectPeopleHeader';

interface Props {
  searchParams: { is_creator_only?: string };
}

export default function IConnectPeoplePage({ searchParams }: Props) {
  return (
    <FollowRecommendsHydrationBoundary
      is_creator_only={searchParams.is_creator_only}
    >
      <main>
        <ConnectPeopleHeader is_creator_only={searchParams.is_creator_only} />
        <ConnectPeople is_creator_only={searchParams.is_creator_only} />
      </main>
    </FollowRecommendsHydrationBoundary>
  );
}
