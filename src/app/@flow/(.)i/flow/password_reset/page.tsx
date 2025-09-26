import IFlowPasswordResetPage from '@/app/i/flow/password_reset/page';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowSignUpSlot({ searchParams }: Props) {
  return <IFlowPasswordResetPage searchParams={searchParams} />;
}
