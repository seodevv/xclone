import { AdvancedMessages } from '@/model/Message';
import { create } from 'zustand';

interface StoreState {
  reply: AdvancedMessages | null;
  media: AdvancedMessages['Media'];
  setReply: (message: AdvancedMessages) => void;
  resetReply: () => void;
  setMedia: (media: AdvancedMessages['Media']) => void;
  resetMedia: () => void;
}

const initialState: StoreState = {
  reply: null,
  media: null,
  setReply: () => {},
  resetReply: () => {},
  setMedia: () => {},
  resetMedia: () => {},
};

const useMessagesStore = create<StoreState>()((set) => ({
  reply: initialState.reply,
  media: initialState.media,
  setReply: (message) => set((state) => ({ reply: message })),
  resetReply: () => set((state) => ({ reply: initialState.reply })),
  setMedia: (media) => set(() => ({ media })),
  resetMedia: () => set(() => ({ media: initialState.media })),
}));

export default useMessagesStore;
