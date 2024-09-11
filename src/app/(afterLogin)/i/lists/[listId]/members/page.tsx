import { redirect } from 'next/navigation';

interface Props {
  params: { listId: string };
}

export default function IListsMembersPage({ params }: Props) {
  redirect(`/home?r=i,lists,${params.listId},members`);
}
