import { IMAGE_DEFAULT_LISTS } from '@/app/_lib/common';
import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { SafeUser } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  session: SafeUser;
  name: AdvancedLists['name'];
  description: AdvancedLists['description'];
  make: AdvancedLists['make'];
  banner?: { link: string; file: File };
  thumbnail?: { link: string; file: File };
}

const useAddListsMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      description,
      make,
      banner,
      thumbnail,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const formData = new FormData();
      formData.append('name', name);
      if (description) {
        formData.append('description', description);
      }

      formData.append('make', make);
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

      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lists`;
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
      session,
      name,
      description,
      make,
      banner,
      thumbnail,
    }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey);

      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<TData, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        if (
          queryKey[0] !== 'lists' ||
          queryKey[1] !== 'list' ||
          queryKey[2] !== session.id
        ) {
          return;
        }

        const queryData =
          queryClient.getQueryData<InfiniteData<TData, number>>(queryKey);
        if (!queryData) return;

        const newLists: AdvancedLists = {
          id: -1,
          userid: session.id,
          User: session,
          name,
          description,
          banner: banner?.link || IMAGE_DEFAULT_LISTS,
          thumbnail: thumbnail?.link || banner?.link || IMAGE_DEFAULT_LISTS,
          make,
          createat: new Date().toISOString(),
          Member: [],
          Follower: [],
          Posts: [],
          UnShow: [],
          Pinned: false,
        };

        const shallow = { ...queryData, pages: [...queryData.pages] };
        shallow.pages[0] = {
          ...shallow.pages[0],
          data: [newLists, ...shallow.pages[0].data],
        };
        queryClient.setQueryData(queryKey, shallow);
        context.push({ queryKey, queryData });
      });

      return context;
    },
    onSuccess: (response, { queryClient, session }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({ queryKey, refetchType: 'none' });

        if (
          queryKey[0] === 'lists' &&
          queryKey[1] === 'list' &&
          queryKey[2] === session.id
        ) {
          const queryData =
            queryClient.getQueryData<InfiniteData<TData, number>>(queryKey);
          if (!queryData) return;

          queryData.pages.forEach((page, i) =>
            page.data.forEach((list, j) => {
              if (list.id !== -1) return;
              const shallow = { ...queryData, pages: [...queryData.pages] };
              shallow.pages[i] = {
                ...shallow.pages[i],
                data: [...shallow.pages[i].data],
              };
              shallow.pages[i].data[j] = response.data;
              queryClient.setQueryData(queryKey, shallow);
            })
          );
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

export default useAddListsMutation;

interface TData {
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}
