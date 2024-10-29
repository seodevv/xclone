import { redirect } from 'next/navigation';

interface Props {
  params: { listid: string };
}

export default function IListsMembersSuggestedPage({ params }: Props) {
  redirect(`/i/lists/${params.listid}`);
}
