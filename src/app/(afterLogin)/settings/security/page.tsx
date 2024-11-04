import SettingsSecurityController from '@/app/(afterLogin)/settings/security/_component/SettingsSecurityController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security / XClone',
};

export default function SettingsSecurityPage() {
  return <SettingsSecurityController />;
}
