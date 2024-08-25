'use client';

import HighlightModal from '@/app/(afterLogin)/_component/alter/HighlightModal';
import RepostSubMenu from '@/app/(afterLogin)/_component/_subMenu/RepostSubMenu';
import UnPinModal from '@/app/(afterLogin)/_component/alter/UnPinModal';
import { AdvancedPost } from '@/model/Post';
import { createContext, Dispatch, Reducer, useReducer } from 'react';
import PostSubMenuSelector from '@/app/(afterLogin)/_component/_subMenu/PostSubMenuSelector';
import WhoCanReply from '@/app/(afterLogin)/_component/_subMenu/WhoCanReply';

interface State {
  status: 'idle' | 'post' | 'repost' | 'highlight' | 'unPin' | 'whoCanReply';
  flag: boolean;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    target?: HTMLButtonElement;
  };
  post?: AdvancedPost;
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
      {menu.flag && menu.status === 'highlight' && <HighlightModal />}
      {menu.flag && menu.status === 'unPin' && <UnPinModal />}
      {menu.flag && menu.status === 'whoCanReply' && <WhoCanReply />}
    </SubMenuContext.Provider>
  );
}
