import { redirect } from 'next/navigation';

export default function SettingsBlockedPage() {
  redirect('/settings/blocked/all');
}
