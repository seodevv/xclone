'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

export const SettingsContext = createContext<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>({
  show: false,
  setShow: () => {},
});

interface Props {
  page: React.ReactNode;
  children?: React.ReactNode;
}

export default function SettingsLayoutController({ page, children }: Props) {
  const [show, setShow] = useState(false);

  return (
    <SettingsContext.Provider value={{ show, setShow }}>
      {show ? page : children}
    </SettingsContext.Provider>
  );
}
