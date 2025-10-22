import FooterController from '@/app/(afterLogin)/_component/_footer/FooterController';
import SingleListsBody from '@/app/(afterLogin)/i/lists/[listid]/_component/SingleListsBody';
import { Metadata } from 'next';

interface Props {
  params: { listid: string };
}

export const metadata: Metadata = {
  title: 'List / XClone',
};

export default function IListsIdPage({ params: { listid } }: Props) {
  return (
    <main>
      <SingleListsBody listid={listid} />
      <FooterController type="post" />
    </main>
  );
}
