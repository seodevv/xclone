import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  listId: AdvancedLists['id'];
  name?: string;
  description?: string;
  banner?: {
    file: File;
    link: string;
  };
  thumbnail?: {
    file: File;
    link: string;
  };
  make?: 'private' | 'public';
  def?: boolean;
}

const useListsUpdateMutation = () =>
  useMutation({
    mutationFn: async ({
      listId,
      name,
      description,
      make,
      banner,
      thumbnail,
      def,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const formData = new FormData();
      if (typeof name !== 'undefined') {
        formData.append('name', name);
      }
      if (typeof description !== 'undefined') {
        formData.append('description', description);
      }
      if (typeof make !== 'undefined') {
        formData.append('make', make);
      }
      if (typeof def !== 'undefined' && def) {
        formData.append('def', '1');
      }
      if (typeof banner !== 'undefined' && typeof thumbnail !== 'undefined') {
        formData.append('banner', banner.file);
        formData.append('thumbnail', thumbnail.file);
      } else if (
        typeof banner !== 'undefined' &&
        typeof thumbnail === 'undefined'
      ) {
        formData.append('banner', banner.file);
        formData.append(
          'thumbnail',
          new File(
            [banner.file],
            banner.file.name.includes('banner_')
              ? banner.file.name.replace('banner_', 'thumbnail_')
              : 'thumbnail_' + banner.file.name,
            {
              type: banner.file.type,
            }
          )
        );
      }

      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listId}/edit`;
      const requestOptions: RequestInit = {
        method: 'POST',
        body: formData,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({
      queryClient,
      listId,
      name,
      description,
      make,
      banner,
      thumbnail,
    }) => {
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
              name: typeof name !== 'undefined' ? name : queryData.data.name,
              description:
                typeof description !== 'undefined'
                  ? description
                  : queryData.data.description,
              make: typeof make !== 'undefined' ? make : queryData.data.make,
              banner:
                typeof banner !== 'undefined'
                  ? banner.link
                  : queryData.data.banner,
              thumbnail:
                typeof thumbnail !== 'undefined'
                  ? thumbnail.link
                  : typeof banner !== 'undefined'
                  ? banner.link
                  : queryData.data.thumbnail,
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
                name: typeof name !== 'undefined' ? name : l.name,
                description:
                  typeof description !== 'undefined'
                    ? description
                    : l.description,
                make: typeof make !== 'undefined' ? make : l.make,
                banner: typeof banner !== 'undefined' ? banner.link : l.banner,
                thumbnail:
                  typeof thumbnail !== 'undefined'
                    ? thumbnail.link
                    : typeof banner !== 'undefined'
                    ? banner.link
                    : l.thumbnail,
              };
            })
          );
          if (shouldBeUpdate) {
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          }
        }
      });
      return context;
    },
    onSuccess: (response, { queryClient, listId }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'none',
        });

        const queryData = queryClient.getQueryData<
          TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>, number>
        >(queryKey);
        if (!queryData) return;

        if (isSingle(queryData)) {
          if (queryData.data.id !== listId) return;
          const shallow: TData<AdvancedLists> = {
            ...queryData,
            data: response.data,
          };
          queryClient.setQueryData(queryKey, shallow);
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
              shallow.pages[i].data[j] = response.data;
            })
          );
          if (shouldBeUpdate) {
            queryClient.setQueryData(queryKey, shallow);
          }
        }
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

export default useListsUpdateMutation;

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
