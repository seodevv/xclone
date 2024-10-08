'use client';

import HighlightModal from '@/app/(afterLogin)/_component/alter/HighlightModal';
import RepostSubMenu from '@/app/(afterLogin)/_component/_subMenu/RepostSubMenu';
import UnPinModal from '@/app/(afterLogin)/_component/alter/UnPinModal';
import { AdvancedPost } from '@/model/Post';
import { createContext, Dispatch, Reducer, useReducer } from 'react';
import PostSubMenuSelector from '@/app/(afterLogin)/_component/_subMenu/PostSubMenuSelector';
import WhoCanReply from '@/app/(afterLogin)/_component/_subMenu/WhoCanReply';
import UnPostModal from '@/app/(afterLogin)/_component/alter/UnPostModal';
import SearchListsOptionsSubMenu from '@/app/(afterLogin)/_component/_subMenu/SearchListsOptionsSubMenu';
import { AdvancedLists } from '@/model/Lists';
import ListsShareSubMenu from '@/app/(afterLogin)/_component/_subMenu/ListsShareSubMenu';
import ListsShowSubMenu from '@/app/(afterLogin)/_component/_subMenu/ListsShowSubMenu';

interface State {
  status:
    | 'idle'
    | 'post'
    | 'repost'
    | 'delete'
    | 'highlight'
    | 'unPin'
    | 'whoCanReply'
    | 'searchListsOption'
    | 'listsShare'
    | 'listsShow';
  flag: boolean;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    target?: HTMLButtonElement;
  };
  post?: AdvancedPost;
  lists?: AdvancedLists;
}
type Action =
  | { type: 'set'; payload: Partial<State> }
  | { type: 'setPosition'; payload: Partial<State['position']> }
  | { type: 'reset' };
interface ISubMenuContext {
  menu: State;
  dispatchMenu: Dispatch<Action>;
}

const initialState: State = {
  status: 'idle',
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
});

interface Props {
  children: React.ReactNode;
}

export default function SubMenuProvider({ children }: Props) {
  const [menu, dispatchMenu] = useReducer(reducer, initialState);

  return (
    <SubMenuContext.Provider value={{ menu, dispatchMenu }}>
      {children}
      {menu.flag && menu.status === 'repost' && <RepostSubMenu />}
      {menu.flag && menu.status === 'post' && <PostSubMenuSelector />}
      {menu.flag && menu.status === 'delete' && <UnPostModal />}
      {menu.flag && menu.status === 'highlight' && <HighlightModal />}
      {menu.flag && menu.status === 'unPin' && <UnPinModal />}
      {menu.flag && menu.status === 'whoCanReply' && <WhoCanReply />}
      {menu.flag && menu.status === 'searchListsOption' && (
        <SearchListsOptionsSubMenu />
      )}
      {menu.flag && menu.status === 'listsShare' && <ListsShareSubMenu />}
      {menu.flag && menu.status === 'listsShow' && menu.lists && (
        <ListsShowSubMenu lists={menu.lists} />
      )}
    </SubMenuContext.Provider>
  );
}
