'use client';

import { AdvancedMessages } from '@/model/Message';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

interface Params {
  sessionId: string;
}

export default function useMessagesQueryData({ sessionId }: Params) {
  const queryClient = useQueryClient();

  type MessageQueryKey = ['messages', 'list', typeof sessionId, string];
  type MessageQueryData = InfiniteData<{
    data: AdvancedMessages[];
    prevCursor?: number;
    message: string;
  }>;

  function getMessage({
    roomid,
    messageid,
  }: {
    roomid: AdvancedMessages['roomid'];
    messageid: AdvancedMessages['id'];
  }): AdvancedMessages | undefined {
    const queryKey: MessageQueryKey = ['messages', 'list', sessionId, roomid];
    const queryData = queryClient.getQueryData<MessageQueryData>(queryKey);

    return queryData?.pages
      .map((p) => p.data)
      .flat()
      .find((m) => m.id === messageid);
  }

  function addMessage({ payload }: { payload: AdvancedMessages }) {
    const queryKey: MessageQueryKey = [
      'messages',
      'list',
      sessionId,
      payload.roomid,
    ];
    const queryData = queryClient.getQueryData<MessageQueryData>(queryKey);
    if (typeof queryData !== 'undefined') {
      const shallow: MessageQueryData = {
        ...queryData,
        pages: [...queryData.pages],
      };
      const targetIndex = queryData.pages.length - 1;
      shallow.pages[targetIndex] = {
        ...queryData.pages[targetIndex],
        data: [...queryData.pages[targetIndex].data],
      };
      shallow.pages[targetIndex].data.push(payload);
      queryClient.setQueryData(queryKey, shallow);
    } else {
      const newQueryData: MessageQueryData = {
        pages: [
          {
            data: [payload],
            message: 'ok',
            prevCursor: payload.id,
          },
        ],
        pageParams: [payload.id],
      };
      queryClient.setQueryData(queryKey, newQueryData);
    }
  }

  function updateMessage({
    roomId,
    target: { messageId, status, payload },
  }: {
    roomId: AdvancedMessages['roomid'];
    target: {
      messageId: AdvancedMessages['id'];
      status: AdvancedMessages['status'];
      payload?: Partial<AdvancedMessages>;
    };
  }) {
    const queryKey: MessageQueryKey = ['messages', 'list', sessionId, roomId];
    const queryData = queryClient.getQueryData<MessageQueryData>(queryKey);
    if (typeof queryData === 'undefined') return;

    queryData.pages.forEach((page, i) =>
      page.data.forEach((message, j) => {
        if (message.id !== messageId) return;
        const shallow: MessageQueryData = {
          ...queryData,
          pages: [...queryData.pages],
        };
        shallow.pages[i] = {
          ...queryData.pages[i],
          data: [...queryData.pages[i].data],
        };
        shallow.pages[i].data[j] = {
          ...message,
          ...payload,
          status: status,
        };
        queryClient.setQueryData(queryKey, shallow);
      })
    );
  }

  function updateSeen({ roomid }: { roomid: AdvancedMessages['roomid'] }) {
    const queryKey: MessageQueryKey = ['messages', 'list', sessionId, roomid];
    const queryData = queryClient.getQueryData<MessageQueryData>(queryKey);
    if (typeof queryData === 'undefined') return;

    const shallow: MessageQueryData = {
      ...queryData,
      pages: [...queryData.pages],
    };
    shallow.pages.forEach((page, i) => {
      shallow.pages[i] = {
        ...queryData.pages[i],
        data: page.data.map((message) => ({ ...message, seen: true })),
      };
    });
    queryClient.setQueryData(queryKey, shallow);
  }

  function deleteMessage({
    roomId,
    target: { messageId },
  }: {
    roomId: AdvancedMessages['roomid'];
    target: {
      messageId: AdvancedMessages['id'];
    };
  }) {
    const queryKey: MessageQueryKey = ['messages', 'list', sessionId, roomId];
    const queryData = queryClient.getQueryData<MessageQueryData>(queryKey);
    if (typeof queryData === 'undefined') return;

    let deleted = false;
    queryData.pages.forEach((page, i) => {
      if (deleted) return;

      const findIndex = page.data.findIndex(
        (message) => message.id === messageId
      );
      if (findIndex === -1) return;

      const shallow: MessageQueryData = {
        ...queryData,
        pages: [...queryData.pages],
      };
      shallow.pages[i] = {
        ...page,
        data: page.data.filter((m) => m.id !== messageId),
      };
      queryClient.setQueryData(queryKey, shallow);
    });
  }

  return {
    getMessage,
    addMessage,
    updateMessage,
    updateSeen,
    deleteMessage,
  };
}
