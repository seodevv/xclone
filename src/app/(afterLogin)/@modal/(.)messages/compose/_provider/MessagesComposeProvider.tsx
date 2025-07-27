'use client';

import { AdvancedUser } from '@/model/User';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

type Type = 'single' | 'group';

export const MessagesComposeContext = createContext<{
  search: string;
  enabled: boolean;
  getType: () => Type;
  changeType: (arg?: Type) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  getUsers: () => AdvancedUser[];
  addUsers: (user: AdvancedUser) => void;
  removeUsers: (userId: AdvancedUser['id']) => void;
  clearUsers: () => void;
}>({
  search: '',
  enabled: false,
  getType: () => 'single',
  changeType: () => {},
  setSearch: () => {},
  setEnabled: () => {},
  getUsers: () => [],
  addUsers: () => {},
  removeUsers: () => {},
  clearUsers: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function MessagesComposeProvider({ children }: Props) {
  const [search, setSearch] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [type, setType] = useState<Type>('single');
  const [users, setUsers] = useState<AdvancedUser[]>([]);

  const getType = () => {
    return type;
  };
  const changeType = (arg?: Type) => {
    setType((prev) => {
      if (typeof arg === 'undefined') {
        return prev === 'single' ? 'group' : 'single';
      } else {
        return arg;
      }
    });
  };
  const getUsers = () => {
    return users;
  };
  const addUsers = (user: AdvancedUser) => {
    const find = users.find((u) => u.id === user.id);
    if (typeof find === 'undefined') {
      setUsers((prev) => {
        const copy = [...prev];
        copy.push(user);
        return copy;
      });
    }
  };
  const removeUsers = (userId: AdvancedUser['id']) => {
    setUsers((prev) => {
      const copy = [...prev];
      const findIndex = copy.findIndex((v) => v.id === userId);
      if (findIndex > -1) {
        copy.splice(findIndex, 1);
      }
      return copy;
    });
  };
  const clearUsers = () => {
    setUsers([]);
  };

  return (
    <MessagesComposeContext.Provider
      value={{
        search,
        enabled,
        getType,
        changeType,
        setSearch,
        setEnabled,
        getUsers,
        addUsers,
        removeUsers,
        clearUsers,
      }}
    >
      {children}
    </MessagesComposeContext.Provider>
  );
}
