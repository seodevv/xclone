import { redirect } from 'next/navigation';

interface Props {
  params: { listid: string };
}

export default function IListsMembersPage({ params }: Props) {
  redirect(`/home?r=i,lists,${params.listid},members`);
}
