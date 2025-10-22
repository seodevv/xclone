import { useSuspenseQuery } from '@tanstack/react-query';
import { getView } from '@/app/(afterLogin)/[username]/_lib/getView';

export const usePostViewQuery = (postid: string) =>
  useSuspenseQuery({
    queryKey: ['posts', 'views', postid],
    queryFn: getView,
  });
