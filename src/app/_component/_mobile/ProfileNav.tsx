import MyProfile from '@/app/(afterLogin)/_component/profile/MyProfile';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import useMobileNavStore from '@/app/(afterLogin)/_store/MbileNavStore';

export default function ProfileNav() {
  const { width, height } = useViewport();
  const open = useMobileNavStore((state) => state.open);

  if (!width || !height) return null;
  if (width > 500 && height > 500) return null;

  return <MyProfile width={32} height={32} onClick={open} />;
}
