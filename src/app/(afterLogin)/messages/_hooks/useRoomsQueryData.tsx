'use client';

import { AdvancedRooms, RoomsNotifications } from '@/model/Room';
import { QueryKey, useQueryClient } from '@tanstack/react-query';

interface Params {
  sessionId: string;
}

export default function useRoomsQueryData({ sessionId }: Params) {
  const queryClient = useQueryClient();
  const queryKey: RoomsQueryKey = ['rooms', 'list', sessionId];

  type RoomsQueryKey = ['rooms', 'list', typeof sessionId];
  type RoomsQueryData = {
    data: AdvancedRooms[];
    message: string;
  };

  function getRoom({
    roomid,
  }: {
    roomid: AdvancedRooms['id'];
  }): AdvancedRooms | undefined {
    const queryData = queryClient.getQueryData<RoomsQueryData>(queryKey);
    return queryData?.data.find((r) => r.id === roomid);
  }

  function addRooms({ payload }: { payload: AdvancedRooms }) {
    const queryData = queryClient.getQueryData<RoomsQueryData>(queryKey);
    if (typeof queryData !== 'undefined') {
      if (!!queryData.data.find((r) => r.id === payload.id)) return;
      const shallow: RoomsQueryData = {
        ...queryData,
        data: [...queryData.data],
      };
      shallow.data.unshift(payload);
      queryClient.setQueryData(queryKey, shallow);
    } else {
      const newQueryData: RoomsQueryData = {
        data: [payload],
        message: 'ok',
      };
      queryClient.setQueryData(queryKey, newQueryData);
    }
  }

  function updateRooms({
    target: { id, payload },
  }: {
    target: {
      id: AdvancedRooms['id'];
      payload: Partial<AdvancedRooms>;
    };
  }) {
    const queryData = queryClient.getQueryData<RoomsQueryData>(queryKey);
    if (typeof queryData !== 'undefined') {
      queryData.data.forEach((room, i) => {
        if (room.id !== id) return;
        const shallow: RoomsQueryData = {
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
  }

  function updateNotification({ roomid }: { roomid: string }) {
    const room = getRoom({ roomid });
    if (typeof room !== 'undefined') {
      updateRooms({
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
    addRooms,
    updateRooms,
    updateNotification,
    updateRoomNotifications,
  };
}
