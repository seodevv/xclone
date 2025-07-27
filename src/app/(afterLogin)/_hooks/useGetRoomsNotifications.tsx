import getRoomsNotifications from '@/app/(afterLogin)/_lib/getRoomsNotifications';
import { useQuery } from '@tanstack/react-query';

const useGetRoomsNotifications = () =>
  useQuery({
    queryKey: ['rooms', 'notifications'],
    queryFn: getRoomsNotifications,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  });

export default useGetRoomsNotifications;
