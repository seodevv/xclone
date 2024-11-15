import { redirect } from 'next/navigation';

export default function SettingsExplorePage() {
  redirect('/home?r=settings,explore');
}
