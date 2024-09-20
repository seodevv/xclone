import { AdvancedPost } from '@/model/Post';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ComposeState {
  type: 'idle' | 'comment' | 'quote';
  post?: AdvancedPost;
  defaultValue: string;
  set: ({
    type,
    post,
  }: {
    type: ComposeState['type'];
    post: ComposeState['post'];
  }) => void;
  setDefaultValue: (defaultValue: ComposeState['defaultValue']) => void;
  reset: () => void;
}

const useComposeStore = create<ComposeState>()(
  devtools(
    persist(
      (set) => ({
        type: 'idle',
        defaultValue: '',
        set: ({ type, post }) => {
          set((state) => ({ type, post }));
        },
        setDefaultValue: (defaultValue) => {
          set((state) => ({ type: 'idle', post: undefined, defaultValue }));
        },
        reset: () => {
          set((state) => ({ type: 'idle', post: undefined, defaultValue: '' }));
        },
      }),
      { name: 'compose-storage' }
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);

export default useComposeStore;
