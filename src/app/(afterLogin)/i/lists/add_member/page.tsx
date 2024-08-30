import IListAddMemberSlot from '@/app/(afterLogin)/@i/(.)i/lists/add_member/page';
import IListLayout from '@/app/(afterLogin)/@i/(.)i/lists/layout';
// import { redirect } from 'next/navigation';

export default function IListAddMemberPage() {
  // redirect('/home?r=i,lists,add_member');
  return (
    <IListLayout>
      <IListAddMemberSlot />
    </IListLayout>
  );
}
