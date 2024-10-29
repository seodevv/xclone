'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedUser } from '@/model/User';
import { QueryClient, QueryKey, useMutation } from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  sessionid: AdvancedUser['id'];
}

const useDeleteUserBirth = () =>
  useMutation({
    mutationFn: async ({}: MutationParams): Promise<{
      data: AdvancedUser;
      message: string;
    }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/birth`;
      const requestOptions: RequestInit = {
        method: 'DELETE',
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, sessionid }) => {
      // queryKey is ['users', sessionid]
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey)
        .filter((key) => key[0] === 'users' && key[1] === sessionid);

      const context: {
        queryKey: QueryKey;
        queryData: TData<AdvancedUser>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const queryData =
          queryClient.getQueryData<TData<AdvancedUser>>(queryKey);
        if (!queryData) return;

        const shallow: TData<AdvancedUser> = {
          ...queryData,
          data: {
            ...queryData.data,
            birth: null,
          },
        };
        queryClient.setQueryData(queryKey, shallow);
        context.push({ queryKey, queryData });
      });
      return context;
    },
    onSuccess: (data, { queryClient, sessionid }, context) => {
      queryClient.invalidateQueries({
        queryKey: ['users', sessionid],
      });
    },
    onError: (erorr, { queryClient }, context) => {
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useDeleteUserBirth;

interface TData<T> {
  data: T;
  nextCursor?: string;
  message: string;
}
