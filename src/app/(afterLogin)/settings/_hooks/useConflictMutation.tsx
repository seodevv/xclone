import { responseErrorHandler } from '@/app/_lib/error';
import { useMutation } from '@tanstack/react-query';

interface MutationParams {
  username: string;
}

export const useConflictMutation = () =>
  useMutation({
    mutationFn: async ({ username }: MutationParams) => {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login?type=signup&id=${username}`;
      const requestOptions: RequestInit = {
        method: 'GET',
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return true;
      }

      return responseErrorHandler(response);
    },
  });
