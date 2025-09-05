'use client';

import { AdvancedRooms } from '@/model/Room';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationParams {
  sessionid: string;
  roomid: AdvancedRooms['id'];
}

const useRoomDisableMutation = () => {
  const queryClient = useQueryClient();

  type SingleData = {
    data: AdvancedRooms;
    message: string;
  };
  type ListData = {
    data: AdvancedRooms[];
  };
  function isSingleData(
    queryData: SingleData | ListData
  ): queryData is SingleData {
    return !Array.isArray(queryData.data);
  }

  return useMutation({
    mutationFn: async ({
      roomid,
    }: MutationParams): Promise<{ data: AdvancedRooms; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${roomid}`;
      const requestInit: RequestInit = {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store',
      };

      const response = await fetch(requestUrl, requestInit);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    },
    onMutate: ({ roomid, sessionid }) => {
      const queryKeys: QueryKey[] = [
        ['rooms', roomid],
        ['rooms', 'list', sessionid],
      ];
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
              Disabled: true,
            },
          };
          queryClient.setQueryData(queryKey, shallow);
          rollbacks.push({ queryKey, queryData });
        } else {
          queryData.data.forEach((room, i) => {
            if (room.id !== roomid) return;

            const shallow: ListData = {
              ...queryData,
              data: [...queryData.data],
            };
            shallow.data[i] = {
              ...room,
              Disabled: true,
            };
            queryClient.setQueryData(queryKey, shallow);
            rollbacks.push({ queryKey, queryData });
          });
        }
      });

      return rollbacks;
    },
    onError: (error, _, rollback) => {
      if (typeof rollback !== 'undefined') {
        rollback.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
    onSuccess: (response, { roomid, sessionid }) => {
      queryClient.invalidateQueries({
        queryKey: ['rooms', roomid],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['rooms', 'list', sessionid],
        refetchType: 'none',
      });
    },
  });
};

export default useRoomDisableMutation;
