'use client';

import { IdentifierInputRef } from '@/app/_component/_input/IdentifierInput';
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';

interface State<T> {
  value: T;
  disabled: boolean;
  ref?: RefObject<IdentifierInputRef>;
}

interface ContextState<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
}

interface ISignUpContext {
  id: ContextState<State<string>>;
  nickname: ContextState<State<string>>;
  birth: ContextState<State<string>>;
  password: ContextState<State<string>>;
  profile: ContextState<State<Profile>>;
  options: ContextState<Options>;
}

interface ImperativeInputRef {
  focus: () => void;
  blur: () => void;
}

export interface Profile {
  file: File | null;
  link: string;
}

export interface Options {
  from: boolean;
  prevPage: number;
  page: number;
  isLoading: boolean;
  animated: boolean;
  edit: boolean;
}

interface Props {
  children: React.ReactNode;
}

function makeInitialState<T>(state: T) {
  return {
    state,
    setState: () => {},
  };
}

export const SignUpContext = createContext<ISignUpContext>({
  id: makeInitialState({ value: '', disabled: true }),
  nickname: makeInitialState({ value: '', disabled: true }),
  birth: makeInitialState({ value: '', disabled: true }),
  password: makeInitialState({ value: '', disabled: true }),
  profile: makeInitialState({
    value: { file: null, link: '' },
    disabled: true,
  }),
  options: makeInitialState({
    from: false,
    prevPage: 0,
    page: 0,
    isLoading: false,
    animated: false,
    edit: false,
  }),
});

export default function SignUpProvider({ children }: Props) {
  const [id, setId] = useState<State<string>>({
    value: '',
    disabled: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [nickname, setNickname] = useState<State<string>>({
    value: '',
    disabled: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [birth, setBirth] = useState<State<string>>({
    value: '',
    disabled: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [password, setPassword] = useState<State<string>>({
    value: '',
    disabled: true,
    ref: useRef<IdentifierInputRef>(null),
  });
  const [profile, setProfile] = useState<State<Profile>>({
    value: {
      file: null,
      link: '',
    },
    disabled: true,
  });
  const [options, setOptions] = useState<Options>({
    from: false,
    prevPage: 0,
    page: 0,
    isLoading: false,
    animated: false,
    edit: false,
  });

  return (
    <SignUpContext.Provider
      value={{
        id: { state: id, setState: setId },
        nickname: { state: nickname, setState: setNickname },
        birth: { state: birth, setState: setBirth },
        password: { state: password, setState: setPassword },
        profile: { state: profile, setState: setProfile },
        options: { state: options, setState: setOptions },
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}
