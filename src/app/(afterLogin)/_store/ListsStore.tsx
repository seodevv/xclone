import { AdvancedLists } from '@/model/Lists';
import { AdvancedPost } from '@/model/Post';
import { create } from 'zustand';

const initialState = {
  postid: undefined,
  lists: undefined,
  suggested: false,
};

interface ListsState {
  postid?: AdvancedPost['postid'];
  lists?: AdvancedLists;
  suggested: boolean;
  prevPath?: string;
  setPostId: (postid: AdvancedPost['postid']) => void;
  setLists: (lists: AdvancedLists) => void;
  setSuggested: (suggested: boolean) => void;
  reset: () => void;
}

const useListsStore = create<ListsState>()((set) => ({
  suggested: false,
  setPostId: (postid) => set((state) => ({ postid })),
  setLists: (lists) => set((state) => ({ lists })),
  setSuggested: (suggested) => set((state) => ({ suggested })),
  reset: () => set((state) => initialState),
}));

export default useListsStore;
