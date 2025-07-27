import { redirect } from 'next/navigation';

export default function MessagesComposePage() {
  redirect('/home?r=messages,compose');
}
