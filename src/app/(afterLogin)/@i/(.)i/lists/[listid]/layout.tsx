import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'List / XClone',
};

export default function IListsIdLayout({ children }: Props) {
  return <>{children}</>;
}
