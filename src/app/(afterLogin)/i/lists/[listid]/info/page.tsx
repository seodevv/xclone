import { redirect } from 'next/navigation';

interface Props {
  params: { listid: string };
}

export default function IListsInfoPage({ params }: Props) {
  redirect(`/i/lists/${params.listid}`);
}
