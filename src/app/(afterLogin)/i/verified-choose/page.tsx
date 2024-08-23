import { redirect } from 'next/navigation';

export default function IVerifiedChoosePage() {
  redirect('/home?r=i,verified-choose');
}
