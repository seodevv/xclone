'use client';

import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedLists } from '@/model/Lists';
import { createContext, Dispatch, Reducer, useEffect, useReducer } from 'react';

const initialState: State = {
  phase: 'create',
  name: '',
  description: '',
  make: 'public',
  image: {
    link: '',
  },
  disabled: true,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setLists':
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        make: action.payload.make,
        image: {
          link: generateImagePath(action.payload.banner),
        },
        disabled: true,
      };
    case 'setPhase':
      return { ...state, phase: action.payload };
    case 'setName':
      return { ...state, name: action.payload, disabled: false };
    case 'setDescription':
      return { ...state, description: action.payload };
    case 'setMake':
      return { ...state, make: action.payload };
    case 'setDefaultImage':
      return { ...state, image: { link: action.payload } };
    case 'setOrigin':
      return {
        ...state,
        phase: 'banner',
        image: {
          ...state.image,
          link: action.payload.link,
          origin: action.payload,
        },
      };
    case 'setBanner':
      return {
        ...state,
        phase: 'thumbnail',
        image: {
          ...state.image,
          link: action.payload.link,
          banner: action.payload,
        },
      };
    case 'setThumbnail':
      return {
        ...state,
        phase: 'create',
        image: {
          ...state.image,
          thumbnail: action.payload,
        },
      };
    case 'setDisable':
      return {
        ...state,
        disabled: action.payload,
      };
    case 'resetImage':
      return { ...state, image: initialState.image };
    case 'reset':
      return { ...initialState };
  }
};

export const IListsContext = createContext<{
  mode: Props['mode'];
  state: State;
  dispatch: Dispatch<Action>;
}>({
  mode: 'idle',
  state: initialState,
  dispatch: () => {},
});

interface Props {
  mode: 'idle' | 'create' | 'edit';
  children: React.ReactNode;
}

export default function IListsProvider({ mode = 'idle', children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lists = useListsStore((state) => state.lists);

  useEffect(() => {
    if (mode === 'edit' && typeof lists !== 'undefined') {
      dispatch({ type: 'setLists', payload: lists });
    }
  }, [mode, lists]);

  return (
    <IListsContext.Provider value={{ mode, state, dispatch }}>
      {children}
    </IListsContext.Provider>
  );
}

interface State {
  phase: 'create' | 'banner' | 'thumbnail';
  name: AdvancedLists['name'];
  description: AdvancedLists['description'];
  make: AdvancedLists['make'];
  image: {
    link: string;
    origin?: {
      link: string;
      file: File;
    };
    banner?: {
      link: string;
      file: File;
    };
    thumbnail?: {
      link: string;
      file: File;
    };
  };
  disabled: boolean;
}

type Action =
  | { type: 'setLists'; payload: AdvancedLists }
  | { type: 'setPhase'; payload: State['phase'] }
  | { type: 'setName'; payload: State['name'] }
  | { type: 'setDescription'; payload: State['description'] }
  | { type: 'setMake'; payload: State['make'] }
  | { type: 'setDefaultImage'; payload: State['image']['link'] }
  | { type: 'setOrigin'; payload: Required<State['image']>['origin'] }
  | { type: 'setBanner'; payload: Required<State['image']>['banner'] }
  | { type: 'setThumbnail'; payload: Required<State['image']>['thumbnail'] }
  | { type: 'setDisable'; payload: State['disabled'] }
  | { type: 'resetImage' | 'reset' };
