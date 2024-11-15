import { redirect } from 'next/navigation';

export default function SettingsSearchPage() {
  redirect('/home?r=settings,search');
}
