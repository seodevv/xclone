import { redirect } from 'next/navigation';

export default function IListsCreatePage() {
  redirect('/home?r=i,lists,create');
}
