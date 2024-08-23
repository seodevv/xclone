import ViewQuotes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_component/ViewQuotes';
import ViewRepostsAndLikes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_component/ViewRepostsAndLikes';

interface Props {
  params: { username: string; id: string; view: string };
}

export default async function ViewPage({
  params: { username, id, view },
}: Props) {
  return (
    <main>
      {view === 'quotes' && (
        <ViewQuotes username={username} id={id} view={view} />
      )}
      {(view === 'retweets' || view === 'likes') && (
        <ViewRepostsAndLikes username={username} id={id} view={view} />
      )}
    </main>
  );
}
