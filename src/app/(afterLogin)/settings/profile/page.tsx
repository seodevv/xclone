import { redirect } from 'next/navigation';

export default function SettingsProfilePage() {
  redirect('/home?r=settings,profile');
}
