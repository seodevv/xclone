import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { AdvancedUser } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  method: 'post' | 'delete';
  listid: AdvancedLists['id'];
  userid: AdvancedLists['userid'];
  sessionid: AdvancedUser['id'];
}

const useListsUnShowMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      listid,
      userid,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const requestUrl = `/api/v1/lists/${listid}/unshow`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          userid,
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
    onMutate: ({ queryClient, method, listid, sessionid }) => {
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
          if (queryData.data.id !== listid) return;
          const shallow: TData<AdvancedLists> = {
            ...queryData,
            data: {
              ...queryData.data,
              UnShow:
                method === 'post'
                  ? [...queryData.data.UnShow, { id: sessionid }]
                  : queryData.data.UnShow.filter((u) => u.id !== sessionid),
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
              if (l.id !== listid) return;
              shouldBeUpdate = true;
              shallow.pages[i] = {
                ...page,
                data: [...page.data],
              };
              shallow.pages[i].data[j] = {
                ...l,
                UnShow:
                  method === 'post'
                    ? [...l.UnShow, { id: sessionid }]
                    : l.UnShow.filter((u) => u.id !== sessionid),
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
