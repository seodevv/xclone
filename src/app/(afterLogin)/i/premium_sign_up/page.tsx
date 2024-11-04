import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Creator Subscriptions / XClone',
};

export default function PremiumSignUpPage() {
  redirect('/home?r=i,premium_sign_up');
}
