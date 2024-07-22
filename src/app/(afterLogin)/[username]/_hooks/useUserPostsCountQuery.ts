import { useQuery } from '@tanstack/react-query';
import { getUserPostsCount } from '../_lib/getUserPostsCount';

export const useUserPostsCountQuery = ({
  username,
  filter = 'all',
}: {
  username: string;
  filter?: 'all' | 'media';
}) =>
  useQuery({
    queryKey: ['posts', 'count', username, { filter }],
    queryFn: getUserPostsCount,
  });
