import { MouseEventHandler } from 'react';
import { create } from 'zustand';

interface State {
  flag: boolean;
  x?: boolean;
  title: string;
  sub: string;
  btnText: string;
  btnTheme?: 'theme' | 'reverse' | 'white' | 'red' | 'primary';
  onClickOutSide?: () => void;
  onClickConfirm: MouseEventHandler<HTMLButtonElement>;
  onClickCancle: () => void;
  noHidden?: boolean;
}

interface Create extends State {
  open: (state: State) => void;
  close: () => void;
}

const useConfirmStore = create<Create>()((set) => {
  const initialState: State = {
    x: false,
    flag: false,
    title: '',
    sub: '',
    btnText: '',
    onClickConfirm: () => {},
    onClickCancle: () => {},
  };

  function open(state: State) {
    set(() => ({ ...state }));
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

export const confirmSelector = (state: Create) => ({
  open: state.open,
  close: state.close,
});
export default useConfirmStore;
