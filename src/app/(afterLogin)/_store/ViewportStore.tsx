import { create } from 'zustand';

interface Create {
  width: number | null;
  height: number | null;
  setViewport: (args: { width: number; height: number }) => void;
}

const useViewportStore = create<Create>()((set) => ({
  width: null,
  height: null,
  setViewport: ({ width, height }) => set((state) => ({ width, height })),
}));

export default useViewportStore;
