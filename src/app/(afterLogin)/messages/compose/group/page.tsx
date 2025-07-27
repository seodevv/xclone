import { redirect } from 'next/navigation';

export default function MessagesComposeGroupPage() {
  redirect('/home?r=messages,compose,group');
}
