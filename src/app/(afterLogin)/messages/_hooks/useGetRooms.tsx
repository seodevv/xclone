import { getRooms } from '@/app/(afterLogin)/messages/_lib/getRooms';
import { useQuery } from '@tanstack/react-query';

const useGetRooms = (username: string) =>
  useQuery({
    queryKey: ['rooms', 'list', username],
    queryFn: getRooms,
  });
export default useGetRooms;
