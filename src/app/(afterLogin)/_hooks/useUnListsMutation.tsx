import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { AdvancedUser } from '@/model/User';
import { QueryClient, useMutation } from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  listid: AdvancedLists['id'];
  sessionid: AdvancedUser['id'];
}

const useUnListsMutation = () =>
  useMutation({
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
    onSuccess: (data, { queryClient, listid, sessionid }) => {
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

export default useUnListsMutation;
