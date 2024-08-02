import SearchBody from './_component/_body/SearchBody';
import { redirect } from 'next/navigation';
import SearchHydrationBoundary from './_boundary/SearchHydrationBoundary';

type Props = {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
};
export default async function SearchPage({ searchParams }: Props) {
  if (!searchParams.q) redirect('/explore');

  return (
    <SearchHydrationBoundary searchParams={searchParams}>
      <SearchBody searchParams={searchParams} />
    </SearchHydrationBoundary>
  );
}
