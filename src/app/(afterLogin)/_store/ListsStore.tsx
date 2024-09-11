import { AdvancedLists } from '@/model/Lists';
import { AdvancedPost } from '@/model/Post';
import { create } from 'zustand';

const initialState = {
  postId: undefined,
  lists: undefined,
  suggested: false,
};

interface ListsState {
  postId?: AdvancedPost['postId'];
  lists?: AdvancedLists;
  suggested: boolean;
  prevPath?: string;
  setPostId: (postId: AdvancedPost['postId']) => void;
  setLists: (lists: AdvancedLists) => void;
  setSuggested: (suggested: boolean) => void;
  reset: () => void;
}

const useListsStore = create<ListsState>()((set) => ({
  suggested: false,
  setPostId: (postId) => set((state) => ({ postId })),
  setLists: (lists) => set((state) => ({ lists })),
  setSuggested: (suggested) => set((state) => ({ suggested })),
  reset: () => set((state) => initialState),
}));

export default useListsStore;
