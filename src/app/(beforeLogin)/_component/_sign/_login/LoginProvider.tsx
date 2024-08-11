'use client';

import { createContext, useState } from 'react';

const LoginContext = createContext({});

interface Props {
  children: React.ReactNode;
}
export default function LoginProvider({ children }: Props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
}
