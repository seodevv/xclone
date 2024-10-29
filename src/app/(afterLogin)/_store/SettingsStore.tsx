import { AdvancedUser } from '@/model/User';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SettingsStore {
  verified: boolean;
  user?: AdvancedUser;
  setVerified: (user: AdvancedUser) => void;
  reset: () => void;
}

const useSettingsSessionStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        verified: false,
        setVerified: (user) => set(() => ({ verified: true, user })),
        reset: () =>
          set(() => ({
            verified: false,
            user: undefined,
            protectPost: false,
            protectVideo: false,
          })),
      }),
      {
        name: 'settings-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useSettingsSessionStore;
