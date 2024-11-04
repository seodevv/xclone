import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface SettingsLocalStore {
  protectPost?: boolean;
  protectVideo?: boolean;
  country?: string;
  gender: {
    type: 'female' | 'male' | 'other';
    other: string;
  };
  tagging: 'none' | 'anyone' | 'only';
  passProtection: boolean;
  setProtectPost: (value: boolean) => void;
  setProtectVideo: (value: boolean) => void;
  setCountry: (value: string) => void;
  setGender: ({
    type,
    other,
  }: {
    type: SettingsLocalStore['gender']['type'];
    other?: string;
  }) => void;
  setTagging: (tagging: SettingsLocalStore['tagging']) => void;
  setPassProtection: (value: boolean) => void;
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
        country: 'South Korea',
        tagging: 'none',
        passProtection: false,
        setProtectPost: (protectPost) => set(() => ({ protectPost })),
        setProtectVideo: (protectVideo) => set(() => ({ protectVideo })),
        setCountry: (country) => set(() => ({ country })),
        setGender: ({ type, other }) =>
          set((state) => ({
            gender: {
              type,
              other: typeof other !== 'undefined' ? other : state.gender.other,
            },
          })),
        setTagging: (tagging) => set(() => ({ tagging })),
        setPassProtection: (passProtection) => set(() => ({ passProtection })),
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
export const countrySelector = (state: SettingsLocalStore) => ({
  country: state.country,
  setCountry: state.setCountry,
});
export const genderSelector = (state: SettingsLocalStore) => ({
  gender: state.gender,
  setGender: state.setGender,
});
export const taggingSelector = (state: SettingsLocalStore) => ({
  tagging: state.tagging,
  setTagging: state.setTagging,
});
export const passProtectionSelector = (state: SettingsLocalStore) => ({
  passProtection: state.passProtection,
  setPassProtection: state.setPassProtection,
});

export default useSettingsLocalStore;
