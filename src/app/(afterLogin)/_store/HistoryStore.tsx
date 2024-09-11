import { create } from 'zustand';

interface StoreState {
  stack: number;
  enable: boolean;
  addStack: () => void;
  removeStack: () => void;
  resetEnable: () => void;
  resetStack: () => void;
}

const useHistoryStore = create<StoreState>()((set) => ({
  stack: 0,
  enable: true,
  addStack: () => {
    set((state) => ({ enable: true, stack: state.stack - 1 }));
  },
  removeStack: () => {
    set((state) => ({ enable: false, stack: state.stack + 1 }));
  },
  resetEnable: () => {
    set((state) => ({ enable: true }));
  },
  resetStack: () => {
    set((state) => ({ enable: true, stack: 0 }));
  },
}));

export default useHistoryStore;
