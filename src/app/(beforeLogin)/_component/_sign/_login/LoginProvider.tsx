'use client';

import {
  createContext,
  Dispatch,
  Reducer,
  RefObject,
  useReducer,
  useRef,
} from 'react';

const reducer: Reducer<ReducerState<State>, Action> = (state, action) => {
  switch (action.type) {
    case 'setId':
      return {
        ...state,
        id: { ...state.id, ...action.payload },
      };
    case 'setPassword':
      return {
        ...state,
        password: { ...state.password, ...action.payload },
      };
    case 'setOptions':
      return {
        ...state,
        options: { ...state.options, ...action.payload },
      };
    case 'setLoading':
      return {
        ...state,
        options: { ...state.options, isLoading: action.payload },
      };
    case 'prevPage':
      return {
        ...state,
        options: {
          ...state.options,
          prevPage: state.options.page,
          page: state.options.page < 1 ? 0 : state.options.page - 1,
        },
      };
    case 'nextPage':
      return {
        ...state,
        options: {
          ...state.options,
          prevPage: state.options.page,
          page: state.options.page > 0 ? 1 : state.options.page + 1,
        },
      };
  }
};

const initialState: { state: State; options: Options } = {
  state: { value: '', disabled: true },
  options: {
    prevPage: 0,
    page: 0,
    animated: false,
    isLoading: false,
  },
};

const initializer = ({
  state,
  options,
}: {
  state: State;
  options: Options;
}): ReducerState<State> => {
  return {
    id: state,
    password: state,
    options,
  };
};

export const LoginContext = createContext<ILoginContext>({
  state: initializer(initialState),
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}
export default function LoginProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
      state: {
        ...initialState.state,
        ref: useRef<ImperativeRef>(null),
      },
    },
    initializer
  );

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

interface ILoginContext {
  state: ReducerState<State>;
  dispatch: Dispatch<Action>;
}
interface ImperativeRef {
  focus: () => void;
  blur: () => void;
}
interface State {
  value: string;
  disabled: boolean;
  ref?: RefObject<ImperativeRef>;
}
interface Options {
  prevPage: number;
  page: number;
  animated: boolean;
  isLoading: boolean;
}
interface ReducerState<State> {
  id: State;
  password: State;
  options: Options;
}

type Action =
  | { type: 'setId' | 'setPassword'; payload: Partial<State> }
  | { type: 'setOptions'; payload: Partial<Options> }
  | { type: 'prevPage' | 'nextPage' }
  | { type: 'setLoading'; payload: boolean };
