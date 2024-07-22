import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';

interface Params {
  username: string;
  filter?: 'all' | 'reply' | 'media' | 'like';
}

export const useUserPostsQuery = ({ username, filter = 'all' }: Params) =>
  useQuery({
    queryKey: ['posts', 'list', username, { filter }],
    queryFn: getUserPosts,
  });
