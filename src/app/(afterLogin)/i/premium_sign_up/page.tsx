import HomePage from '../../home/page';
import SoftNavigation from './_component/SoftNavigation';

interface Props {
  searchParams: { r?: string };
}

export default function PremiumSignUpPage({ searchParams }: Props) {
  return (
    <>
      <HomePage searchParams={searchParams} />
      <SoftNavigation />
    </>
  );
}
