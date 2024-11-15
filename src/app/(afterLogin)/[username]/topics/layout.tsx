import UserTopicsFollowed from '@/app/(afterLogin)/[username]/topics/_component/UserTopicsFollowed';
import UserTopicsTabs from '@/app/(afterLogin)/[username]/topics/_component/UserTopicsTabs';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';

interface Props {
  params: { username: string };
  children: React.ReactNode;
}

export default function UserTopicsLayout({ params, children }: Props) {
  return (
    <main>
      <PageHeader title="Topics" />
      <UserTopicsTabs username={params.username} />
      <UserTopicsFollowed />
      {children}
    </main>
  );
}
