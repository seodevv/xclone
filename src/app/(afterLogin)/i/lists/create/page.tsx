import IListsCreateSlot from '@/app/(afterLogin)/@i/(.)i/lists/create/page';
import IListLayout from '@/app/(afterLogin)/@i/(.)i/lists/layout';
// import { redirect } from 'next/navigation';

export default function IListsCreatePage() {
  //   redirect('/home?r=i,lists,create');
  return (
    <IListLayout>
      <IListsCreateSlot />
    </IListLayout>
  );
}
