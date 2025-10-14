'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedRooms } from '@/model/Room';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationParams {
  roomid: string;
}

const useRoomNotificationMutation = (sessionid: string) => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['rooms', 'list', sessionid];

  type RoomsQueryData = {
    data: AdvancedRooms[];
    message: string;
  };

  return useMutation({
    mutationFn: async ({ roomid }: MutationParams) => {
      const requestUrl = `/api/v1/rooms/${roomid}/seen`;
      const requestInit: RequestInit = {
        method: 'POST',
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestInit);

      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ roomid }) => {
      const queryData = queryClient.getQueryData<RoomsQueryData>(queryKey);
      if (typeof queryData !== 'undefined') {
        queryData.data.forEach((room, i) => {
          if (room.id !== roomid) return;
          const shallow: RoomsQueryData = {
            ...queryData,
            data: [...queryData.data],
          };
          shallow.data[i] = {
            ...room,
            sent: room.sent.map((u) => {
              if (u.id !== sessionid) {
                return { id: u.id, count: 0 };
              }
              return u;
            }),
          };
          queryClient.setQueryData(queryKey, shallow);
        });
      }

      return queryData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
        refetchType: 'none',
      });
    },
    onError: (error, _, context) => {
      //   console.error(error);
      if (typeof context !== 'undefined') {
        queryClient.setQueryData(queryKey, context);
      }
    },
  });
};

export default useRoomNotificationMutation;
