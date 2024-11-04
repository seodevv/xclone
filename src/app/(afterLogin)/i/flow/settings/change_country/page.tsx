import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Change country / XClone',
};

export default function IFlowSettingsChangeCountryPage() {
  redirect('/settings/country');
}
