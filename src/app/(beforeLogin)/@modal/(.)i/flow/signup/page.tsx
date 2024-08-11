import IFlowSignUpPage from '@/app/(beforeLogin)/i/flow/signup/page';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowSignUpSlot({ searchParams }: Props) {
  return (
    <>
      <IFlowSignUpPage searchParams={searchParams} />
    </>
  );
}
