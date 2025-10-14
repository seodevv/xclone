import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedMessages } from '@/model/Message';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  payload: {
    type: 'disable' | 'addReact' | 'undoReact';
    session: {
      id: string;
      nickname: string;
      image: string;
    };
    roomid: AdvancedMessages['roomid'];
    messageid: AdvancedMessages['id'];
    content?: AdvancedMessages['content'];
  };
}

type MessagesQueryData = InfiniteData<{
  data: AdvancedMessages[];
  prevCursor?: number;
  message: string;
}>;

const useMessagesMutation = () =>
  useMutation({
    mutationFn: async ({
      payload: { type, roomid, messageid, content },
    }: MutationParams) => {
      let requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${roomid}`;
      let requestInit: RequestInit = {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      switch (type) {
        case 'disable': {
          requestInit.method = 'DELETE';
          requestInit.body = JSON.stringify({ messageid });
          break;
        }
        case 'addReact':
        case 'undoReact': {
          requestUrl += '/react';
          requestInit.method = type === 'addReact' ? 'POST' : 'DELETE';
          requestInit.body = JSON.stringify({
            messageid,
            content,
          });
          break;
        }
      }

      const response = await fetch(requestUrl, requestInit);
      if (response.ok) {
        return new Promise((resolve) => resolve(undefined));
      }

      return responseErrorHandler(response);
    },
    onMutate: ({
      queryClient,
      payload: { type, session, roomid, messageid, content },
    }) => {
      const queryKey: QueryKey = ['messages', 'list', session.id, roomid];
      const queryData = queryClient.getQueryData<MessagesQueryData>(queryKey);
      const context: { queryKey: QueryKey; queryData?: MessagesQueryData }[] =
        [];

      if (typeof queryData !== 'undefined') {
        queryData.pages.forEach((page, i) =>
          page.data.forEach((message, j) => {
            if (message.id !== messageid) return;
            const shallow: MessagesQueryData = {
              ...queryData,
              pages: [...queryData.pages],
            };
            shallow.pages[i] = {
              ...queryData.pages[i],
              data: [...queryData.pages[i].data],
            };
            shallow.pages[i].data[j] = { ...message };
            switch (type) {
              case 'disable':
                shallow.pages[i].data[j].Disable = [
                  ...message.Disable,
                  { id: session.id },
                ];
                break;
              case 'addReact':
                if (typeof content !== 'undefined') {
                  let check = false;
                  shallow.pages[i].data[j].React = message.React.map((r) => {
                    if (r.id === session.id) {
                      check = true;
                      return { ...r, content };
                    }
                    return r;
                  });

                  if (!check) {
                    shallow.pages[i].data[j].React.push({
                      id: session.id,
                      nickname: session.nickname,
                      image: session.image,
                      verified: null,
                      content,
                    });
                  }
                }
                break;
              case 'undoReact':
                shallow.pages[i].data[j].React = message.React.filter(
                  (r) => r.id !== session.id
                );
                break;
            }
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          })
        );
      }

      return context;
    },
    onSuccess: (response, { queryClient }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
      });
    },
    onError: (error, { queryClient }, context) => {
      if (typeof context !== 'undefined') {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useMessagesMutation;
