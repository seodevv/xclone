import { redirect } from 'next/navigation';

interface Props {
  params: { listId: string };
}

export default function IListsInfoPage({ params }: Props) {
  redirect(`/i/lists/${params.listId}`);
}
