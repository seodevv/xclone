import { redirect } from 'next/navigation';

export default function IListAddMemberPage() {
  redirect('/home?r=i,lists,add_member');
}
