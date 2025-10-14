import { responseErrorHandler } from '@/app/_lib/error';
import { useMutation } from '@tanstack/react-query';

interface MutationParams {
  current: string;
  newPassword: string;
}

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: async ({ current, newPassword }: MutationParams) => {
      const requestUrl = `/api/v1/password`;
      const requestInit: RequestInit = {
        method: 'POST',
        body: JSON.stringify({
          current,
          newPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestInit);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
  });
