import { Metadata } from 'next';
import SearchBody from './_component/_body/SearchBody';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
};

export function generateMetadata({ searchParams: { q } }: Props): Metadata {
  if (typeof q === 'undefined') {
    return {
      title: 'Explore / XClone',
    };
  }

  return {
    title: `${decodeURIComponent(q)} - search / XClone`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  if (!searchParams.q) redirect('/explore');

  return (
    // <SearchHydrationBoundary searchParams={searchParams}>
    <SearchBody searchParams={searchParams} />
    // </SearchHydrationBoundary>
  );
}
