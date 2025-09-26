import IFlowSignUpPage from '@/app/i/flow/signup/page';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowPasswordResetSlot({ searchParams }: Props) {
  return <IFlowSignUpPage searchParams={searchParams} />;
}
