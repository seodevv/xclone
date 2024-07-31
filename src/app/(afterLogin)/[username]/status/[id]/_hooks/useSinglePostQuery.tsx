import { useSuspenseQuery } from '@tanstack/react-query';
import { getSinglePost } from '../_lib/getSinglePost';

interface Params {
  username: string;
  id: string;
}

export const useSinglePostQuery = ({ username, id }: Params) =>
  useSuspenseQuery({
    queryKey: ['posts', id, { username }],
    queryFn: getSinglePost,
  });
