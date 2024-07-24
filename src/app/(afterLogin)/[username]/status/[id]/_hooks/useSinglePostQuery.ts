import { useSuspenseQuery } from '@tanstack/react-query';
import { getSinglePost } from '../_lib/getSinglePost';

export const useSinglePostQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
  });
