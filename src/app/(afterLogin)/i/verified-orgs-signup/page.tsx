import { redirect } from 'next/navigation';

export default function IVerifiedOrgsSignUpPage() {
  redirect('/home?r=i,verified-orgs-signup');
}
