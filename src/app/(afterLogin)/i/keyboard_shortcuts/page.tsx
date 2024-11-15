import { redirect } from 'next/navigation';

export default function IKeyboardShortcutsPage() {
  redirect('/home?r=i,keyboard_shortcuts');
}
