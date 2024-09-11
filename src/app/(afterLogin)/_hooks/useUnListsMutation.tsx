import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { User } from '@/model/User';
import { QueryClient, useMutation } from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  listId: AdvancedLists['id'];
  sessionId: User['id'];
}

const useUnListsMutation = () =>
  useMutation({
    mutationFn: async ({
      listId,
    }: MutationParams): Promise<{ message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listId}`;
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
    onSuccess: (data, { queryClient, listId, sessionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['lists', listId.toString()],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['lists', 'list', sessionId],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'lists', listId.toString()],
        refetchType: 'none',
      });
    },
  });

export default useUnListsMutation;
