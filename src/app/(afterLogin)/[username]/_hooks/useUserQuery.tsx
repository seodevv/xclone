import { useQuery } from '@tanstack/react-query';
import { getUser } from '../_lib/getUser';

export const useUserQuery = (username: string) =>
  useQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
