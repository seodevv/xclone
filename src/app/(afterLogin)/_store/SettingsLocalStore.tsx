import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface SettingsLocalStore {
  protectPost?: boolean;
  protectVideo?: boolean;
  gender: {
    type: 'female' | 'male' | 'other';
    other: string;
  };
  setProtectPost: (value: boolean) => void;
  setProtectVideo: (value: boolean) => void;
  setGender: ({
    type,
    other,
  }: {
    type: SettingsLocalStore['gender']['type'];
    other?: string;
  }) => void;
}

const useSettingsLocalStore = create<SettingsLocalStore>()(
  devtools(
    persist(
      (set) => ({
        protectPost: false,
        protectVideo: false,
        gender: {
          type: 'female',
          other: '',
        },
        setProtectPost: (value) => set(() => ({ protectPost: value })),
        setProtectVideo: (value) => set(() => ({ protectVideo: value })),
        setGender: ({ type, other }) =>
          set((state) => ({
            gender: {
              type,
              other: typeof other !== 'undefined' ? other : state.gender.other,
            },
          })),
      }),
      {
        name: 'settings-local-store',
      }
    )
  )
);

export const AudienceSelector = (state: SettingsLocalStore) => ({
  protectPost: state.protectPost,
  setProtectPost: state.setProtectPost,
  protectVideo: state.protectVideo,
  setProtectVideo: state.setProtectVideo,
});

export const GenderSelector = (state: SettingsLocalStore) => ({
  gender: state.gender,
  setGender: state.setGender,
});

export default useSettingsLocalStore;
