import { AdvancedUser } from '@/model/User';
import { useMutation } from '@tanstack/react-query';

interface MutationParams {
  password: string;
}

const useConfirmPassword = () =>
  useMutation({
    mutationFn: async ({
      password,
    }: MutationParams): Promise<{ data: AdvancedUser; message: string }> => {
      const requestUrl = `/api/v1/confirm`;
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }
      throw new Error('The password you entered was incorrect.');
    },
  });

export default useConfirmPassword;
