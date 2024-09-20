import getListsRecommends from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_lib/getListsRecommends';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetListsRecommends = () =>
  useInfiniteQuery({
    queryKey: ['lists', 'list', 'recommends'],
    queryFn: getListsRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    maxPages: 3,
  });

export default useGetListsRecommends;
