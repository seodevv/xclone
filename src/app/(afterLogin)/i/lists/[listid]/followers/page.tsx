import { redirect } from 'next/navigation';

interface Props {
  params: { listid: string };
}

export default function IListsFollowersPage({ params }: Props) {
  redirect(`/home?r=i,lists,${params.listid},followers`);
}
