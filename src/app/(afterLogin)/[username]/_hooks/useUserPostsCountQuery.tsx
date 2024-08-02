import { useQuery } from '@tanstack/react-query';
import { getUserPostsCount } from '../_lib/getUserPostsCount';

interface Params {
  username: string;
  filter?: 'all' | 'media' | 'likes';
}

export const useUserPostsCountQuery = ({ username, filter = 'all' }: Params) =>
  useQuery({
    queryKey: ['posts', 'count', username, { filter }],
    queryFn: getUserPostsCount,
  });
