import HomePage from '@/app/(afterLogin)/home/page';

interface Props {
  searchParams: { r?: string };
}

export default function SettingsProfilePage({ searchParams }: Props) {
  return <HomePage searchParams={searchParams} />;
}
