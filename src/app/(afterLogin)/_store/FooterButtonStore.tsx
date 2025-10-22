import { create } from 'zustand';

export type FooterButtonType = 'post' | 'dm' | 'comment' | 'lists';

interface State {
  flag: boolean;
  type: FooterButtonType;
}

interface Create extends State {
  setButton: (type: State['type']) => void;
  resetButton: () => void;
}

const useFooterButtonStore = create<Create>()((set) => {
  const initiaiState: State = {
    flag: false,
    type: 'post',
  };

  function setButton(type: State['type']) {
    set({ flag: true, type });
  }

  function resetButton() {
    set({ ...initiaiState });
  }

  return {
    ...initiaiState,
    setButton,
    resetButton,
  };
});

export default useFooterButtonStore;
