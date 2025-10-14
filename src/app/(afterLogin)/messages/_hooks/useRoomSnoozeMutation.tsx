'use client';

import { AdvancedRooms, Snooze } from '@/model/Room';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

interface PostParams {
  method: 'POST';
  sessionid: string;
  roomid: AdvancedRooms['id'];
  snooze: Snooze['type'];
}
interface DeleteParams {
  method: 'DELETE';
  sessionid: string;
  roomid: AdvancedRooms['id'];
  snooze: null;
}

const useRoomSnoozeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: PostParams | DeleteParams
    ): Promise<{ data: AdvancedRooms; message: string }> => {
      const requestUrl = `/api/v1/rooms/${params.roomid}/snooze`;
      const requestInit: RequestInit = {
        method: params.method,
        credentials: 'include',
        cache: 'no-store',
      };

      if (params.method === 'POST') {
        requestInit.body = JSON.stringify({ snooze: params.snooze });
        requestInit.headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(requestUrl, requestInit);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    },
    onMutate: ({ method, sessionid, roomid, snooze }) => {
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
              Snooze:
                method === 'POST'
                  ? {
                      type: snooze,
                      createat: new Date().toISOString(),
                    }
                  : null,
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
              Snooze:
                method === 'POST'
                  ? {
                      type: snooze,
                      createat: new Date().toISOString(),
                    }
                  : null,
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

export default useRoomSnoozeMutation;
