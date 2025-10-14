'use client';

import { AdvancedRooms } from '@/model/Room';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationParam {
  method: 'POST' | 'DELETE';
  roomid: AdvancedRooms['id'];
  sessionid: string;
}

const useRoomPinMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      method,
      roomid,
    }: MutationParam): Promise<{ data: AdvancedRooms; message: string }> => {
      const requestUrl = `/api/v1/rooms/${roomid}/pin`;
      const requestInit: RequestInit = {
        method,
        credentials: 'include',
        cache: 'no-store',
      };

      const response = await fetch(requestUrl, requestInit);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    },
    onMutate: ({ method, roomid, sessionid }) => {
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
          // [rooms, :roomid]
          const shallow: SingleData = {
            ...queryData,
            data: {
              ...queryData.data,
              Pinned: method === 'POST' ? true : false,
            },
          };
          queryClient.setQueryData(queryKey, shallow);
          rollbacks.push({ queryKey, queryData });
        } else {
          // [rooms, list, :sessionid]
          queryData.data.forEach((room, i) => {
            if (room.id !== roomid) return;

            const shallow: ListData = {
              ...queryData,
              data: [...queryData.data],
            };
            shallow.data[i] = {
              ...room,
              Pinned: method === 'POST' ? true : false,
            };
            queryClient.setQueryData(queryKey, shallow);
            rollbacks.push({ queryKey, queryData });
          });
        }
      });

      return rollbacks;
    },
    onSuccess: (_, { roomid, sessionid }) => {
      queryClient.invalidateQueries({
        queryKey: ['rooms', roomid],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['rooms', 'list', sessionid],
        refetchType: 'none',
      });
    },
    onError: (error, _, rollback) => {
      console.error(error);
      if (typeof rollback !== 'undefined') {
        rollback.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });
};

type SingleData = {
  data: AdvancedRooms;
  message: string;
};
type ListData = {
  data: AdvancedRooms[];
  message: string;
};
const isSingleData = (v: SingleData | ListData): v is SingleData =>
  !Array.isArray(v.data);

export default useRoomPinMutation;
