import { AdvancedPost } from '@/model/Post';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ComposeState {
  type: 'idle' | 'comment' | 'quote';
  post?: AdvancedPost;
  set: ({
    type,
    post,
  }: {
    type: ComposeState['type'];
    post: AdvancedPost;
  }) => void;
  reset: () => void;
}

const initialState = {
  type: 'idle' as const,
  post: undefined,
};

const useComposeStore = create<ComposeState>()(
  devtools(
    persist(
      (set) => ({
        type: 'idle',
        set: ({ type, post }) => set((state) => ({ type, post })),
        reset: () => set((state) => initialState),
      }),
      { name: 'compose-storage' }
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);

export default useComposeStore;
