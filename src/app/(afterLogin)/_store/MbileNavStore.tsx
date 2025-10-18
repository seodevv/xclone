import { create } from 'zustand';

interface State {
  flag: boolean;
}

interface Create extends State {
  open: (state?: State) => void;
  close: () => void;
}

const useMobileNavStore = create<Create>()((set) => {
  const initialState: State = {
    flag: false,
  };

  function open(state?: State) {
    set(() => ({ ...state, flag: true }));
  }

  function close() {
    set(() => ({ ...initialState }));
  }

  return {
    ...initialState,
    open,
    close,
  };
});

export default useMobileNavStore;
