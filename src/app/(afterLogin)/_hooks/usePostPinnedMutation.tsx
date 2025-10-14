'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface Variables {
  method: 'post' | 'delete';
  postid: AdvancedPost['postid'];
  sessionid: string;
}

const usePostPinnedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      method,
      postid,
    }: Variables): Promise<{ data: AdvancedPost; message: string }> => {
      const requestUrl = `/api/v1/posts/${postid}/pinned`;
      const requestOptions: RequestInit = {
        method,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ method, postid }) => {
      type SingleData = {
        data: AdvancedPost;
        message: string;
      };
      type ListData = InfiniteData<
        { data: AdvancedPost[]; message: string },
        number
      >;
      function isSingleData(
        queryData: SingleData | ListData
      ): queryData is SingleData {
        return queryData.hasOwnProperty('data');
      }

      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => key[0] === 'posts' && key[1] !== 'count');
      const rollbacks: {
        queryKey: QueryKey;
        queryData: SingleData | ListData;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const queryData = queryClient.getQueryData<SingleData | ListData>(
          queryKey
        );
        if (typeof queryData === 'undefined') return;

        if (isSingleData(queryData)) {
          const shallow: SingleData = {
            ...queryData,
            data: {
              ...queryData.data,
              pinned: method === 'post' ? true : false,
            },
          };
          queryClient.setQueryData(queryKey, shallow);
          rollbacks.push({ queryKey, queryData });
        } else {
          if (method === 'post') {
            const shallow = { ...queryData };
            queryData.pages.forEach((page, i) =>
              page.data.forEach((p, j) => {
                if (p.postid !== postid) return;

                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data.splice(j, 1);
                shallow.pages[0].data.unshift({ ...p, pinned: true });
                shallow.pageParams = [...shallow.pageParams];
                shallow.pageParams[i] =
                  i === 0
                    ? 0
                    : (shallow.pages[i].data.at(-1)?.postid as number);
              })
            );
            queryClient.setQueryData(queryKey, shallow);
            rollbacks.push({ queryKey, queryData });
          }
          // delete pin
          else if (method === 'delete') {
            const flatten = queryData.pages
              .map((page) => page.data.map((p) => p))
              .flat();
            const findPostIndex = flatten.findIndex((p) => p.postid === postid);
            if (findPostIndex === -1) return;
            flatten[findPostIndex] = {
              ...flatten[findPostIndex],
              pinned: false,
            };

            flatten.sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return a.createat > b.createat ? -1 : 1;
            });
            const shallow = { ...queryData };
            queryData.pages.forEach((page, i) => {
              shallow.pages = [...shallow.pages];
              shallow.pages[i] = {
                ...page,
                data: flatten.slice(10 * i, 10 * (i + 1)),
              };
              shallow.pageParams[i] =
                i === 0
                  ? 0
                  : (flatten.slice(10 * i, 10 * (i + 1)).at(-1)
                      ?.postid as number);
            });

            queryClient.setQueryData(queryKey, shallow);
            rollbacks.push({ queryKey, queryData });
          }
        }
      });

      return rollbacks;
    },
    onSuccess: (response, _, rollbacks) => {
      rollbacks.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
      });
    },
    onError: (error, _, rollbacks) => {
      console.error(error);
      if (typeof rollbacks !== 'undefined') {
        rollbacks.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });
};

interface TData {
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}

export default usePostPinnedMutation;
