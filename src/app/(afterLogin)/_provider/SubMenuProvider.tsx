'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HighlightModal from '@/app/(afterLogin)/_component/alter/HighlightModal';
import RepostSubMenu from '@/app/(afterLogin)/_component/_subMenu/RepostSubMenu';
import UnPinModal from '@/app/(afterLogin)/_component/alter/UnPinModal';
import { AdvancedPost } from '@/model/Post';
import { createContext, Dispatch, Reducer, useReducer, useState } from 'react';
import PostSubMenuSelector from '@/app/(afterLogin)/_component/_subMenu/PostSubMenuSelector';
import WhoCanReply from '@/app/(afterLogin)/_component/_subMenu/WhoCanReply';
import UnPostModal from '@/app/(afterLogin)/_component/alter/UnPostModal';
import SearchListsOptionsSubMenu from '@/app/(afterLogin)/_component/_subMenu/SearchListsOptionsSubMenu';
import { AdvancedLists } from '@/model/Lists';
import ListsShareSubMenu from '@/app/(afterLogin)/_component/_subMenu/ListsShareSubMenu';
import ListsShowSubMenu from '@/app/(afterLogin)/_component/_subMenu/ListsShowSubMenu';
import RoomSubMenu from '@/app/(afterLogin)/_component/_subMenu/RoomSubMenu';
import { AdvancedMessages } from '@/model/Message';
import { Session } from 'next-auth';
import MessageReactionEditSubMenu from '@/app/(afterLogin)/_component/_subMenu/MessageReactionEditSubMenu';
import MessageOptionSubMenu from '@/app/(afterLogin)/_component/_subMenu/MessageOptionSubMenu';
import MessageReactionInfoSubMenu from '@/app/(afterLogin)/_component/_subMenu/MessageReactionInfoSubMenu';
import MessageInfoNotificationSubMenu from '@/app/(afterLogin)/_component/_subMenu/MessageInfoNotificationSubMenu';
import OtherNavSubMenu from '@/app/(afterLogin)/_component/_subMenu/OtherNavSubMenu';
import SignSubMenu from '@/app/(afterLogin)/_component/_subMenu/SignSubMenu';
import { AdvancedRooms } from '@/model/Room';

interface State {
  status:
    | {
        type: 'idle';
      }
    | { type: 'nav' }
    | { type: 'sign' }
    | {
        type:
          | 'post'
          | 'delete'
          | 'repost'
          | 'highlight'
          | 'unPin'
          | 'whoCanReply';
        post: AdvancedPost;
        sessionid: string;
      }
    | { type: 'lists_search'; sessionid: string }
    | { type: 'lists_share' }
    | { type: 'lists_show'; lists: AdvancedLists }
    | { type: 'room'; room: AdvancedRooms }
    | { type: 'message_option'; message: AdvancedMessages }
    | {
        type: 'message_reaction_add';
        message: AdvancedMessages;
        sessionid: string;
        callback: (emoji: string, selected: boolean) => void;
      }
    | {
        type: 'message_reaction_info';
        message: AdvancedMessages;
        sessionid: string;
        callback: (reaction: AdvancedMessages['React'][0]) => void;
      }
    | {
        type: 'message_notification';
        callback: (time: '1h' | '8h' | '1w' | 'forever') => void;
      };
  flag: boolean;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    target?: Element;
  };
}
type Action =
  | { type: 'set'; payload: Partial<State> }
  | { type: 'setPosition'; payload: Partial<State['position']> }
  | { type: 'reset' };
interface ISubMenuContext {
  menu: State;
  dispatchMenu: Dispatch<Action>;
  close: () => void;
  hide: (flag: boolean) => void;
}

const initialState: State = {
  status: { type: 'idle' },
  flag: false,
  position: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    case 'setPosition':
      return { ...state, position: { ...state.position, ...action.payload } };
    case 'reset':
      return initialState;
  }
};
export const SubMenuContext = createContext<ISubMenuContext>({
  menu: initialState,
  dispatchMenu: () => {},
  close: () => {},
  hide: () => {},
});

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export default function SubMenuProvider({ children }: Props) {
  const [menu, dispatchMenu] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(true);

  const close = () => {
    dispatchMenu({ type: 'reset' });
    setVisible(true);
  };

  const hide = (flag: boolean) => {
    setVisible(!flag);
  };

  return (
    <SubMenuContext.Provider value={{ menu, dispatchMenu, close, hide }}>
      {children}
      <nav
        className={cx(
          visible ? utils.visible : utils.invisible,
          visible ? utils.opacity_1 : utils.opacity_0,
          utils.transit_visibility
        )}
      >
        {menu.flag && menu.status.type === 'nav' && <OtherNavSubMenu />}
        {menu.flag && menu.status.type === 'sign' && <SignSubMenu />}
        {menu.flag && menu.status.type === 'post' && (
          <PostSubMenuSelector
            post={menu.status.post}
            sessionid={menu.status.sessionid}
          />
        )}
        {menu.flag && menu.status.type === 'repost' && (
          <RepostSubMenu
            post={menu.status.post}
            sessionid={menu.status.sessionid}
          />
        )}
        {menu.flag && menu.status.type === 'delete' && (
          <UnPostModal
            post={menu.status.post}
            sessionid={menu.status.sessionid}
          />
        )}
        {menu.flag && menu.status.type === 'highlight' && (
          <HighlightModal
            post={menu.status.post}
            sessionid={menu.status.sessionid}
          />
        )}
        {menu.flag && menu.status.type === 'unPin' && (
          <UnPinModal
            post={menu.status.post}
            sessionid={menu.status.sessionid}
          />
        )}
        {menu.flag && menu.status.type === 'whoCanReply' && (
          <WhoCanReply post={menu.status.post} />
        )}
        {menu.flag && menu.status.type === 'lists_search' && (
          <SearchListsOptionsSubMenu sessionid={menu.status.sessionid} />
        )}
        {menu.flag && menu.status.type === 'lists_share' && (
          <ListsShareSubMenu />
        )}
        {menu.flag && menu.status.type === 'lists_show' && (
          <ListsShowSubMenu lists={menu.status.lists} />
        )}
        {menu.flag && menu.status.type === 'room' && (
          <RoomSubMenu room={menu.status.room} />
        )}
        {menu.flag && menu.status.type === 'message_reaction_add' && (
          <MessageReactionEditSubMenu
            message={menu.status.message}
            sessionid={menu.status.sessionid}
            callback={menu.status.callback}
          />
        )}
        {menu.flag && menu.status.type === 'message_option' && (
          <MessageOptionSubMenu message={menu.status.message} />
        )}
        {menu.flag && menu.status.type === 'message_reaction_info' && (
          <MessageReactionInfoSubMenu
            message={menu.status.message}
            sessionid={menu.status.sessionid}
            callback={menu.status.callback}
          />
        )}
        {menu.flag && menu.status.type === 'message_notification' && (
          <MessageInfoNotificationSubMenu callback={menu.status.callback} />
        )}
      </nav>
    </SubMenuContext.Provider>
  );
}
