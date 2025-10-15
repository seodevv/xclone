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
  optimistic: boolean;
  listid: AdvancedLists['id'];
  member: AdvancedUser;
}

const useListsMemberMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      listid,
      member,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${listid}/member`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          memberid: member.id,
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
    onMutate: ({ queryClient, method, optimistic, listid, member }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey)
        .filter(
          (key) =>
            key[0] === 'lists' ||
            (key[0] === 'users' &&
              key[1] === 'list' &&
              key[2] === 'lists' &&
              key[3] === listid)
        );
      const context: {
        queryKey: QueryKey;
        queryData:
          | TData<AdvancedLists>
          | InfiniteData<TData<AdvancedLists[]>, number>
          | InfiniteData<TData<AdvancedUser[]>, string>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        switch (queryKey[0]) {
          // queryKey is ['users','list','lists',listid]
          case 'users': {
            // only optimistic
            if (!optimistic) return;

            const queryData =
              queryClient.getQueryData<
                InfiniteData<TData<AdvancedUser[]>, string>
              >(queryKey);
            if (!queryData) return;

            const shallow = { ...queryData, pages: [...queryData.pages] };
            if (method === 'post') {
              shallow.pages[0] = {
                ...shallow.pages[0],
                data: [member, ...shallow.pages[0].data],
              };
              queryClient.setQueryData(queryKey, shallow);
              context.push({ queryKey, queryData });
            } else if (method === 'delete') {
              queryData.pages.forEach((page, i) =>
                page.data.forEach((u, j) => {
                  if (u.id !== member.id) return;
                  shallow.pages[i] = {
                    ...shallow.pages[i],
                    data: shallow.pages[i].data.filter(
                      (u) => u.id !== member.id
                    ),
                  };
                  queryClient.setQueryData(queryKey, shallow);
                  context.push({ queryKey, queryData });
                })
              );
            }
            break;
          }
          // queryKey is ['lists', *]
          case 'lists': {
            const queryData = queryClient.getQueryData<
              | TData<AdvancedLists>
              | InfiniteData<TData<AdvancedLists[]>, number>
            >(queryKey);
            if (!queryData) return;

            if (isSingleLists(queryData)) {
              const shallow: TData<AdvancedLists> = {
                ...queryData,
                data: {
                  ...queryData.data,
                  Member:
                    method === 'post'
                      ? [...queryData.data.Member, { id: member.id }]
                      : queryData.data.Member.filter((m) => m.id !== member.id),
                },
              };
              queryClient.setQueryData(queryKey, shallow);
              context.push({ queryKey, queryData });
            } else {
              queryData.pages.forEach((page, i) =>
                page.data.forEach((l, j) => {
                  if (l.id !== listid) return;
                  const shallow = {
                    ...queryData,
                    pages: [...queryData.pages],
                  };
                  shallow.pages[i] = {
                    ...shallow.pages[i],
                    data: [...shallow.pages[i].data],
                  };
                  shallow.pages[i].data[j] = {
                    ...l,
                    Member:
                      method === 'post'
                        ? [...l.Member, { id: member.id }]
                        : l.Member.filter((m) => m.id !== member.id),
                  };
                  queryClient.setQueryData(queryKey, shallow);
                  context.push({ queryKey, queryData });
                })
              );
            }
            break;
          }
        }
      });
      return context;
    },
    onSuccess: (response, { queryClient, optimistic, listid }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'none',
        });
      });
      if (!optimistic) {
        queryClient.invalidateQueries({
          queryKey: ['users', 'list', 'lists', listid.toString()],
          refetchType: 'none',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'lists', listid.toString()],
        refetchType: 'none',
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

export default useListsMemberMutation;

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}

function isSingleLists(
  data: TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>, number>
): data is TData<AdvancedLists> {
  return Object.hasOwn(data, 'data');
}
