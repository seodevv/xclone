import IFlowLoginPage from '@/app/(beforeLogin)/i/flow/login/page';

interface Props {
  searchParams: { from?: string };
}

export default function IFlowLoginSlot({ searchParams }: Props) {
  return (
    <>
      <IFlowLoginPage searchParams={searchParams} />
    </>
  );
}
