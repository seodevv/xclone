import { getRoom } from '@/app/(afterLogin)/messages/_lib/getRoom';
import { useQuery } from '@tanstack/react-query';

const useGetRoom = (roomid: string) =>
  useQuery({
    queryKey: ['rooms', roomid],
    queryFn: getRoom,
  });

export default useGetRoom;
