import { AdvancedUser } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  type: 'follow' | 'unfollow';
  sourceId: AdvancedUser['id'];
  targetId: AdvancedUser['id'];
}

interface TData {
  data: AdvancedUser;
  message: string;
}
interface InfiniteTData {
  data: AdvancedUser[];
  nextCursor?: string;
  message: string;
}
type Context = {
  queryKey: QueryKey;
  queryData: TData | InfiniteData<InfiniteTData, string>;
}[];

const useFollowMutation = () =>
  useMutation({
    mutationFn: async ({
      type,
      targetId,
    }: MutationParams): Promise<{ data?: AdvancedUser; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${targetId}/follow`;
      const requestOptions: RequestInit = {
        method: type === 'follow' ? 'POST' : 'DELETE',
        credentials: 'include',
        cache: 'no-store',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.status === 404) {
        throw new Error('not-found');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    },
    onMutate: ({ queryClient, type, sourceId, targetId }) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((c) => c.queryKey);
      const rollbacks: Context = [];
      queryKeys.forEach((queryKey) => {
        // Followers in ['users',sourceId] // FiniteData
        // Followers in ['users',targetId] // FiniteData
        // Followers in ['users','list','recommends'] // InfiniteDate
        // Followers in ['users','list',targetId',{...options}] // InfiniteDate
        // Followers in ['users','list','search',{...options}] // InfiniteDate
        const [a, b] = queryKey;
        if (a !== 'users') return;
        if (b === targetId || b === sourceId) {
          const queryData = queryClient.getQueryData<TData>(queryKey);
          if (!queryData) return;

          const check = queryData.data.Followers.some((f) => f.id === sourceId);
          if (type === 'follow' && check) return;
          if (type === 'unfollow' && !check) return;

          const shallow = { ...queryData };
          shallow.data = { ...queryData.data };
          if (type === 'follow') {
            shallow.data.Followers = [
              ...queryData.data.Followers,
              { id: sourceId },
            ];
            shallow.data._count = {
              ...queryData.data._count,
              Followers:
                b === targetId
                  ? queryData.data._count.Followers + 1
                  : queryData.data._count.Followers,
              Followings:
                b === sourceId
                  ? queryData.data._count.Followings + 1
                  : queryData.data._count.Followings,
            };
          } else {
            shallow.data.Followers = queryData.data.Followers.filter(
              (u) => u.id !== sourceId
            );
            shallow.data._count = {
              ...queryData.data._count,
              Followers:
                b === targetId
                  ? queryData.data._count.Followers > 0
                    ? queryData.data._count.Followers - 1
                    : 0
                  : queryData.data._count.Followers,
              Followings:
                b === sourceId
                  ? queryData.data._count.Followings > 0
                    ? queryData.data._count.Followings - 1
                    : 0
                  : queryData.data._count.Followings,
            };
          }
          queryClient.setQueryData(queryKey, shallow);
          rollbacks.push({ queryKey, queryData });
        }
        if (b === 'list') {
          const queryData =
            queryClient.getQueryData<InfiniteData<InfiniteTData, string>>(
              queryKey
            );
          if (!queryData) return;
          queryData.pages.forEach((page, i) =>
            page.data.forEach((u, j) => {
              if (u.id !== targetId) return;
              const check = u.Followers.some((f) => f.id === sourceId);
              if (type === 'follow' && check) return;
              if (type === 'unfollow' && !check) return;

              const shallow = { ...queryData };
              shallow.pages = [...queryData.pages];
              shallow.pages[i] = { ...queryData.pages[i] };
              shallow.pages[i].data = [...queryData.pages[i].data];
              shallow.pages[i].data[j] = { ...queryData.pages[i].data[j] };

              if (type === 'follow') {
                shallow.pages[i].data[j].Followers = [
                  ...queryData.pages[i].data[j].Followers,
                  { id: sourceId },
                ];
                shallow.pages[i].data[j]._count = {
                  ...queryData.pages[i].data[j]._count,
                  Followers: queryData.pages[i].data[j]._count.Followers + 1,
                };
              } else {
                shallow.pages[i].data[j].Followers = queryData.pages[i].data[
                  j
                ].Followers.filter((u) => u.id !== sourceId);
                shallow.pages[i].data[j]._count = {
                  ...queryData.pages[i].data[j]._count,
                  Followers:
                    queryData.pages[i].data[j]._count.Followers > 0
                      ? queryData.pages[i].data[j]._count.Followers - 1
                      : queryData.pages[i].data[j]._count.Followers,
                };
              }

              queryClient.setQueryData(queryKey, shallow);
              rollbacks.push({ queryKey, queryData });
            })
          );
        }
      });
      return rollbacks;
    },
    onSuccess: (response, { queryClient, sourceId, targetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'list', 'recommends'],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['users', 'list', targetId, { type: 'follow' }],
      });
      queryClient.invalidateQueries({
        queryKey: ['users', 'list', targetId, { type: 'verified_followers' }],
      });
      queryClient.invalidateQueries({
        queryKey: ['users', 'list', sourceId, { type: 'following' }],
      });
    },
    onError: (error, { queryClient }, context?: Context) => {
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useFollowMutation;
