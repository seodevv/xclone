'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { AdvancedUser } from '@/model/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationParams {
  listid: AdvancedLists['id'];
  sessionid: AdvancedUser['id'];
}

const useUnListsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listid,
    }: MutationParams): Promise<{ message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listid}`;
      const requestOptions: RequestInit = {
        method: 'DELETE',
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return { message: 'ok' };
      }

      return responseErrorHandler(response);
    },
    onSuccess: (data, { listid, sessionid }) => {
      queryClient.invalidateQueries({
        queryKey: ['lists', listid.toString()],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['lists', 'list', sessionid],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'lists', listid.toString()],
        refetchType: 'none',
      });
    },
  });
};

export default useUnListsMutation;
