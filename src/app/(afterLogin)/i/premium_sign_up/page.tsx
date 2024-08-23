import { redirect } from 'next/navigation';

export default function PremiumSignUpPage() {
  redirect('/home?r=i,premium_sign_up');
}
