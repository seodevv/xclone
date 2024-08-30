import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

interface PopUpState {
  type: 'idle' | 'pop';
  content: {
    title: string;
    description: string;
  };
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    element?: HTMLButtonElement;
  };
  setPopup: ({
    content,
    position,
  }: {
    content?: Partial<PopUpState['content']>;
    position?: Partial<PopUpState['position']>;
  }) => void;
  reset: () => void;
}

const initialState = {
  type: 'idle' as const,
  content: {
    title: '',
    description: '',
  },
  position: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};

const usePopUpStore = create<PopUpState>()(
  // devtools(
  (set) => ({
    ...initialState,
    setPopup: ({ content, position }) =>
      set((state) => ({
        ...state,
        type: 'pop',
        content: { ...state.content, ...content },
        position: { ...state.position, ...position },
      })),
    reset: () => set((state) => initialState),
  })
  //   { enabled: process.env.NODE_ENV === 'development' }
  // )
);

export default usePopUpStore;
