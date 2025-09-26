import { create } from 'zustand';

export interface AlterState {
  show: boolean;
  message: string;
  duration: number;
  type: 'notice' | 'warning' | 'error';
}

interface AlterCreate extends AlterState {
  setModal: (state: Partial<AlterState>) => void;
  resetModal: () => void;
}

const useAlterStore = create<AlterCreate>()((set) => ({
  show: false,
  message: '',
  duration: 20000,
  type: 'notice',
  setModal: (state) => set(() => ({ ...state })),
  resetModal: () => {
    set(() => ({ show: false, message: '', duration: 2000, type: 'notice' }));
  },
}));

export default useAlterStore;
