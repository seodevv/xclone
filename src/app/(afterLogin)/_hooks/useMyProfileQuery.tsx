import { getMyProfile } from '@/app/(afterLogin)/_lib/getMyProfile';
import { useQuery } from '@tanstack/react-query';

export const useMyProfileQuery = () =>
  useQuery({
    queryKey: ['users', 'myProfile'],
    queryFn: getMyProfile,
  });
