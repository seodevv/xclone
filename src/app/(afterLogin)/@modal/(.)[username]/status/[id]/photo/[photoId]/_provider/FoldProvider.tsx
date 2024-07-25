'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Fold {
  fold: boolean;
  setFold: Dispatch<SetStateAction<Fold['fold']>>;
}

export const FoldContext = createContext<Fold>({
  fold: false,
  setFold: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function FoldProvider({ children }: Props) {
  const [fold, setFold] = useState(false);

  return (
    <FoldContext.Provider value={{ fold, setFold }}>
      {children}
    </FoldContext.Provider>
  );
}
