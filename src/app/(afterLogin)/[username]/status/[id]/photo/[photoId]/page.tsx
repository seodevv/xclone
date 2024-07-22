import { redirect } from 'next/navigation';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default function Page({ params: { username, id } }: Props) {
  redirect(`/${username}/status/${id}`);
}
