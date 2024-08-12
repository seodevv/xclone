import { redirect } from 'next/navigation';

export default function ComposePostPage() {
  redirect('/home?r=compose,post');
}
