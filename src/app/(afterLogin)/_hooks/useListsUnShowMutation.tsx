import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { User } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  method: 'post' | 'delete';
  listId: AdvancedLists['id'];
  userId: AdvancedLists['userId'];
  sessionId: User['id'];
}

const useListsUnShowMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      listId,
      userId,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listId}/unshow`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          userId,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, method, listId, sessionId }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey)
        .filter((key) => key[0] === 'lists');
      const context: {
        queryKey: QueryKey;
        queryData:
          | TData<AdvancedLists>
          | InfiniteData<TData<AdvancedLists[]>, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const queryData = queryClient.getQueryData<
          TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>, number>
        >(queryKey);
        if (!queryData) return;

        if (isSingle(queryData)) {
          if (queryData.data.id !== listId) return;
          const shallow: TData<AdvancedLists> = {
            ...queryData,
            data: {
              ...queryData.data,
              UnShow:
                method === 'post'
                  ? [...queryData.data.UnShow, { id: sessionId }]
                  : queryData.data.UnShow.filter((u) => u.id !== sessionId),
            },
          };
          queryClient.setQueryData(queryKey, shallow);
          context.push({ queryKey, queryData });
        } else {
          const shallow: InfiniteData<TData<AdvancedLists[]>, number> = {
            ...queryData,
            pages: [...queryData.pages],
          };
          let shouldBeUpdate = false;
          queryData.pages.forEach((page, i) =>
            page.data.forEach((l, j) => {
              if (l.id !== listId) return;
              shouldBeUpdate = true;
              shallow.pages[i] = {
                ...page,
                data: [...page.data],
              };
              shallow.pages[i].data[j] = {
                ...l,
                UnShow:
                  method === 'post'
                    ? [...l.UnShow, { id: sessionId }]
                    : l.UnShow.filter((u) => u.id !== sessionId),
              };
            })
          );
          if (shouldBeUpdate) {
            queryClient.setQueryData(queryKey, queryData);
            context.push({ queryKey, queryData });
          }
        }
      });

      return context;
    },
    onSuccess: (response, { queryClient }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'none',
        });
      });
    },
    onError: (error, { queryClient }, context) => {
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useListsUnShowMutation;

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}

const isSingle = (
  data: TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>, number>
): data is TData<AdvancedLists> => {
  return Object.hasOwn(data, 'data');
};
