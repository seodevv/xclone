'use client';

import { AdvancedRooms, RoomsNotifications } from '@/model/Room';
import { QueryKey, useQueryClient } from '@tanstack/react-query';

interface Params {
  sessionId: string;
}

export default function useRoomsQueryData({ sessionId }: Params) {
  const queryClient = useQueryClient();
  type SingleQueryData = {
    data: AdvancedRooms;
    message: string;
  };
  type ListQueryData = {
    data: AdvancedRooms[];
    message: string;
  };
  function isSingleQueryData(
    queryData: SingleQueryData | ListQueryData
  ): queryData is SingleQueryData {
    return !Array.isArray(queryData.data);
  }

  function getRoom({
    roomid,
  }: {
    roomid: AdvancedRooms['id'];
  }): AdvancedRooms | undefined {
    const queryData = queryClient.getQueryData<ListQueryData>([
      'rooms',
      'list',
      sessionId,
    ]);
    return queryData?.data.find((r) => r.id === roomid);
  }

  function addRoom({ payload }: { payload: AdvancedRooms }) {
    const queryKey = ['rooms', 'list', sessionId];
    const queryData = queryClient.getQueryData<ListQueryData>(queryKey);
    if (typeof queryData !== 'undefined') {
      if (!!queryData.data.find((r) => r.id === payload.id)) return;
      const shallow: ListQueryData = {
        ...queryData,
        data: [...queryData.data],
      };
      shallow.data.unshift(payload);
      queryClient.setQueryData(queryKey, shallow);
    } else {
      const newQueryData: ListQueryData = {
        data: [payload],
        message: 'ok',
      };
      queryClient.setQueryData(queryKey, newQueryData);
    }
  }

  function updateRoom({
    target: { id, payload },
  }: {
    target: {
      id: AdvancedRooms['id'];
      payload: Partial<AdvancedRooms>;
    };
  }) {
    const queryKeys = [
      ['rooms', id],
      ['rooms', 'list', sessionId],
    ];

    queryKeys.forEach((queryKey) => {
      const queryData = queryClient.getQueryData<
        SingleQueryData | ListQueryData
      >(queryKey);
      if (typeof queryData === 'undefined') return;

      if (isSingleQueryData(queryData)) {
        const shallow: SingleQueryData = {
          ...queryData,
          data: {
            ...queryData.data,
            ...payload,
          },
        };
        queryClient.setQueryData(queryKey, shallow);
      } else {
        queryData.data.forEach((room, i) => {
          if (room.id !== id) return;
          const shallow: ListQueryData = {
            ...queryData,
            data: [...queryData.data],
          };
          shallow.data[i] = {
            ...queryData.data[i],
            ...payload,
          };
          queryClient.setQueryData(queryKey, shallow);
        });
      }
    });
  }

  function updateNotification({ roomid }: { roomid: string }) {
    const room = getRoom({ roomid });
    if (typeof room !== 'undefined') {
      updateRoom({
        target: {
          id: room.id,
          payload: {
            sent: room.sent.map((u) => {
              if (u.id !== sessionId) {
                return {
                  id: u.id,
                  count: 0,
                };
              }
              return u;
            }),
          },
        },
      });
    }
  }

  function updateRoomNotifications({
    type,
    roomid,
  }: {
    type: 'add' | 'remove';
    roomid: AdvancedRooms['id'];
  }) {
    const queryKey: QueryKey = ['rooms', 'notifications'];
    const queryData = queryClient.getQueryData<{
      data: RoomsNotifications[];
      message: string;
    }>(queryKey);
    if (typeof queryData !== 'undefined') {
      const findIndex = queryData.data.findIndex((v) => v.id === roomid);
      if (findIndex > -1) {
        const shallow = { ...queryData, data: [...queryData.data] };
        shallow.data[findIndex] = {
          ...queryData.data[findIndex],
          Notifications:
            type === 'add' ? queryData.data[findIndex].Notifications + 1 : 0,
        };
        queryClient.setQueryData(queryKey, shallow);
      }
    }
  }

  return {
    getRoom,
    addRoom,
    updateRoom,
    updateNotification,
    updateRoomNotifications,
  };
}
