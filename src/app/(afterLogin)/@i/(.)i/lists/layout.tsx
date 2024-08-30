import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';

interface Props {
  children?: React.ReactNode;
}

export default function IListLayout({ children }: Props) {
  return <IBackground overflow="auto">{children}</IBackground>;
}
