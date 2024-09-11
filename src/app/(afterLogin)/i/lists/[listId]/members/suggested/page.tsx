import { redirect } from 'next/navigation';

interface Props {
  params: { listId: string };
}

export default function IListsMembersSuggestedPage({ params }: Props) {
  redirect(`/i/lists/${params.listId}`);
}
