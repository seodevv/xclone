import { responseErrorHandler } from '@/app/_lib/error';
import { useMutation } from '@tanstack/react-query';

interface MutationParams {
  current: string;
  newPassword: string;
}

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: async ({ current, newPassword }: MutationParams) => {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/password`;
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
