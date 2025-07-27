import { AdvancedUser } from '@/model/User';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Mute {
  keyword: string;
  timeline: boolean;
  notification: 'none' | 'anyone' | 'unfollow';
  duration: 'forever' | '24h' | '7d' | '30d';
}

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
  personalize: boolean;
  delegate: 'none' | 'anyone' | 'only';
  sensitive: {
    post: boolean;
    media: boolean;
  };
  location: {
    permission: 'none' | 'deny' | 'allow';
    history: string[];
    personalize: boolean;
  };
  search: {
    hideSensitive: boolean;
    removeBlocks: boolean;
  };
  explore: {
    showLocation: boolean;
    trendsForYou: boolean;
  };
  mute: Mute[];
  mutedNotifications: {
    follow: boolean;
    following: boolean;
    newAccount: boolean;
    defaultProfile: boolean;
    confirmedEmail: boolean;
    confirmedPhone: boolean;
  };
  directMessages: {
    allow: 'no' | 'verified' | 'every';
    filterLowQuality: boolean;
    readReceipts: boolean;
  };
  spaces: boolean;
  contacts: {
    email: boolean;
    phone: boolean;
  };
  adsPreferences: boolean;
  allowBusinessPartners: boolean;
  grok: {
    sharing: boolean;
  };
  notifications: {
    qualityFilter: boolean;
    push: {
      permission: NotificationPermission;
      relatedPosts: {
        posts: boolean;
        mentions: 'tailored' | 'anyone' | 'off';
        reposts: 'tailored' | 'anyone' | 'off';
        likes: 'tailored' | 'anyone' | 'off';
        photoTags: boolean;
        newFollowers: boolean;
        directMessages: boolean;
        messageReactions: 'own' | 'everyone' | 'off';
        contactX: boolean;
      };
      fromX: {
        topics: boolean;
        newsSports: boolean;
        recommendations: boolean;
        moments: boolean;
        broadcastsSpaces: boolean;
        otherLiveBroadcasts: boolean;
        crisisEmbergencyAlerts: boolean;
      };
      xProfessionals: {
        adsCampaigns: boolean;
      };
    };
    email: {
      active: boolean;
      relatedPosts: {
        new: boolean;
        direct: boolean;
        posts: boolean;
        stories: 'daily' | 'weekly' | 'periodically' | 'off';
        update: boolean;
      };
      fromX: {
        newsUpdates: boolean;
        tipsX: boolean;
        lastLogged: boolean;
        newsXPartner: boolean;
        participation: boolean;
        suggestionsAccounts: boolean;
        suggestionsFollows: boolean;
        tipsXBusiness: boolean;
      };
    };
  };
  accessibility: {
    vision: { contrast: boolean };
    motion: {
      reduce: boolean;
      autoplay: boolean;
    };
    media: {
      reminder: boolean;
    };
  };
  display: {
    fontsize: 'ex_small' | 'small' | 'default' | 'large' | 'ex_large';
    color: 'blue' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green';
    background: 'default' | 'dim' | 'lights_out';
  };
  data: {
    saver: boolean;
    autoplay: 'cellular' | 'never';
  };
  conversationInfo: {
    id: AdvancedUser['id'];
    snooze: '1h' | '8h' | '1w' | 'forever';
    timestamp: Date;
  }[];
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
  setPersonalize: (value: boolean) => void;
  setDelegate: (value: SettingsLocalStore['delegate']) => void;
  setSensitive: (value: Partial<SettingsLocalStore['sensitive']>) => void;
  setLocation: (value: Partial<SettingsLocalStore['location']>) => void;
  setSearch: (value: Partial<SettingsLocalStore['search']>) => void;
  setExplore: (value: Partial<SettingsLocalStore['explore']>) => void;
  addMute: (value: Mute) => void;
  removeMute: (value: string) => void;
  updateMute: (value: Mute) => void;
  setMutedNotifications: (
    value: Partial<SettingsLocalStore['mutedNotifications']>
  ) => void;
  setDirectMessages: (
    value: Partial<SettingsLocalStore['directMessages']>
  ) => void;
  setSpaces: (value: boolean) => void;
  setContacts: (value: Partial<SettingsLocalStore['contacts']>) => void;
  setAdsPreferences: (value: boolean) => void;
  setAllowBusinessPartners: (value: boolean) => void;
  setGrok: (value: Partial<SettingsLocalStore['grok']>) => void;
  setNotifications: (
    value: Partial<SettingsLocalStore['notifications']>
  ) => void;
  setPushNotificationPermissions: (value: NotificationPermission) => void;
  setPushNotifications: ({
    relatedPosts,
    fromX,
    xProfessionals,
  }: {
    relatedPosts?: Partial<
      SettingsLocalStore['notifications']['push']['relatedPosts']
    >;
    fromX?: Partial<SettingsLocalStore['notifications']['push']['fromX']>;
    xProfessionals?: Partial<
      SettingsLocalStore['notifications']['push']['xProfessionals']
    >;
  }) => void;
  setEmailNotificationsActive: (value: boolean) => void;
  setEmailNotifications: (value: {
    relatedPosts?: Partial<
      SettingsLocalStore['notifications']['email']['relatedPosts']
    >;
    fromX?: Partial<SettingsLocalStore['notifications']['email']['fromX']>;
  }) => void;
  setAccessibility: (
    value: Partial<SettingsLocalStore['accessibility']>
  ) => void;
  setDisplay: (value: Partial<SettingsLocalStore['display']>) => void;
  setData: (value: Partial<SettingsLocalStore['data']>) => void;
  setConversationInfo: (
    value:
      | {
          type: 'add';
          payload: SettingsLocalStore['conversationInfo'][0];
        }
      | {
          type: 'delete';
          payload: Pick<SettingsLocalStore['conversationInfo'][0], 'id'>;
        }
  ) => void;
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
        personalize: false,
        delegate: 'none',
        sensitive: {
          post: false,
          media: false,
        },
        location: {
          permission: 'none',
          history: ['Republic of Korea'],
          personalize: true,
        },
        search: {
          hideSensitive: true,
          removeBlocks: true,
        },
        explore: {
          showLocation: true,
          trendsForYou: true,
        },
        mute: [],
        mutedNotifications: {
          follow: false,
          following: false,
          newAccount: false,
          defaultProfile: false,
          confirmedEmail: false,
          confirmedPhone: false,
        },
        directMessages: {
          allow: 'no',
          filterLowQuality: true,
          readReceipts: true,
        },
        spaces: false,
        contacts: {
          email: true,
          phone: true,
        },
        adsPreferences: false,
        allowBusinessPartners: false,
        grok: {
          sharing: true,
        },
        notifications: {
          qualityFilter: true,
          push: {
            permission: 'default',
            relatedPosts: {
              posts: true,
              mentions: 'tailored',
              reposts: 'tailored',
              likes: 'tailored',
              photoTags: true,
              newFollowers: true,
              directMessages: true,
              messageReactions: 'own',
              contactX: true,
            },
            fromX: {
              topics: true,
              newsSports: true,
              recommendations: true,
              moments: true,
              broadcastsSpaces: true,
              otherLiveBroadcasts: true,
              crisisEmbergencyAlerts: true,
            },
            xProfessionals: {
              adsCampaigns: true,
            },
          },
          email: {
            active: true,
            relatedPosts: {
              new: true,
              direct: true,
              posts: true,
              stories: 'periodically',
              update: false,
            },
            fromX: {
              newsUpdates: true,
              tipsX: true,
              lastLogged: true,
              newsXPartner: true,
              participation: true,
              suggestionsAccounts: true,
              suggestionsFollows: true,
              tipsXBusiness: true,
            },
          },
        },
        accessibility: {
          vision: {
            contrast: false,
          },
          motion: {
            reduce: false,
            autoplay: false,
          },
          media: {
            reminder: false,
          },
        },
        display: {
          fontsize: 'small',
          color: 'blue',
          background: 'lights_out',
        },
        data: {
          saver: false,
          autoplay: 'cellular',
        },
        conversationInfo: [],
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
        setPersonalize: (personalize) => set(() => ({ personalize })),
        setDelegate: (delegate) => set(() => ({ delegate })),
        setSensitive: (sensitive) =>
          set((state) => ({
            sensitive: { ...state.sensitive, ...sensitive },
          })),
        setLocation: (value) =>
          set((state) => ({
            location: {
              ...state.location,
              ...value,
            },
          })),
        setSearch: (search) =>
          set((state) => ({ search: { ...state.search, ...search } })),
        setExplore: (explore) =>
          set((state) => ({ explore: { ...state.explore, ...explore } })),
        addMute: (value) =>
          set((state) => {
            const shallow = [...state.mute];
            shallow.unshift(value);
            return {
              mute: shallow,
            };
          }),
        removeMute: (keyword) =>
          set((state) => {
            const shallow = [...state.mute];
            const findIndex = shallow.findIndex((v) => v.keyword === keyword);
            if (findIndex > -1) {
              shallow.splice(findIndex, 1);
            }
            return {
              mute: shallow,
            };
          }),
        updateMute: (value) =>
          set((state) => {
            const shallow = [...state.mute];
            const findIndex = shallow.findIndex(
              (v) => v.keyword === value.keyword
            );
            if (findIndex > -1) {
              shallow[findIndex] = value;
            }
            return {
              mute: shallow,
            };
          }),
        setMutedNotifications: (value) =>
          set((state) => ({
            mutedNotifications: {
              ...state.mutedNotifications,
              ...value,
            },
          })),
        setDirectMessages: (value) =>
          set((state) => ({
            directMessages: {
              ...state.directMessages,
              ...value,
            },
          })),
        setSpaces: (value) => set((state) => ({ spaces: value })),
        setContacts: (value) =>
          set((state) => ({
            contacts: {
              ...state.contacts,
              ...value,
            },
          })),
        setAdsPreferences: (value) =>
          set((state) => ({ adsPreferences: value })),
        setAllowBusinessPartners: (value) =>
          set((state) => ({ allowBusinessPartners: value })),
        setGrok: (value) =>
          set((state) => ({ grok: { ...state.grok, ...value } })),
        setNotifications: (value) =>
          set((state) => ({
            notifications: { ...state.notifications, ...value },
          })),
        setPushNotificationPermissions: (permission) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              push: {
                ...state.notifications.push,
                permission,
              },
            },
          })),
        setPushNotifications: ({ relatedPosts, fromX, xProfessionals }) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              push: {
                ...state.notifications.push,
                relatedPosts: {
                  ...state.notifications.push.relatedPosts,
                  ...relatedPosts,
                },
                fromX: {
                  ...state.notifications.push.fromX,
                  ...fromX,
                },
                xProfessionals: {
                  ...state.notifications.push.xProfessionals,
                  ...xProfessionals,
                },
              },
            },
          })),
        setEmailNotificationsActive: (value) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              email: {
                ...state.notifications.email,
                active: value,
              },
            },
          })),
        setEmailNotifications: ({ relatedPosts, fromX }) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              email: {
                ...state.notifications.email,
                relatedPosts: {
                  ...state.notifications.email.relatedPosts,
                  ...relatedPosts,
                },
                fromX: {
                  ...state.notifications.email.fromX,
                  ...fromX,
                },
              },
            },
          })),
        setAccessibility: (value) =>
          set((state) => ({
            accessibility: {
              ...state.accessibility,
              ...value,
            },
          })),
        setDisplay: (value) =>
          set((state) => ({
            display: {
              ...state.display,
              ...value,
            },
          })),
        setData: (value) =>
          set((state) => ({
            data: {
              ...state.data,
              ...value,
            },
          })),
        setConversationInfo: ({ type, payload }) =>
          set((state) => {
            switch (type) {
              case 'add': {
                const findIndex = state.conversationInfo.findIndex(
                  (c) => c.id === payload.id
                );
                if (findIndex > -1) {
                  const copy: SettingsLocalStore['conversationInfo'] = [
                    ...state.conversationInfo,
                  ];
                  copy[findIndex] = {
                    ...state.conversationInfo[findIndex],
                    snooze: payload.snooze,
                    timestamp: payload.timestamp,
                  };
                  return { conversationInfo: copy };
                } else {
                  return {
                    conversationInfo: [...state.conversationInfo, payload],
                  };
                }
              }
              case 'delete': {
                return {
                  conversationInfo: state.conversationInfo.filter(
                    (c) => c.id !== payload.id
                  ),
                };
              }
            }
          }),
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
export const personalizeSelector = (state: SettingsLocalStore) => ({
  personalize: state.personalize,
  setPersonalize: state.setPersonalize,
});
export const delegateSelector = (state: SettingsLocalStore) => ({
  delegate: state.delegate,
  setDelegate: state.setDelegate,
});
export const sensitiveSelector = (state: SettingsLocalStore) => ({
  sensitive: state.sensitive,
  setSensitive: state.setSensitive,
});
export const locationSelector = (state: SettingsLocalStore) => ({
  location: state.location,
  setLocation: state.setLocation,
});
export const SearchSelector = (state: SettingsLocalStore) => ({
  search: state.search,
  setSearch: state.setSearch,
});
export const ExploreSelector = (state: SettingsLocalStore) => ({
  explore: state.explore,
  setExplore: state.setExplore,
});
export const MuteSelector = (state: SettingsLocalStore) => ({
  mute: state.mute,
  addMute: state.addMute,
  removeMute: state.removeMute,
  updateMute: state.updateMute,
});
export const MutedWordSelector = (id?: string) => (state: SettingsLocalStore) =>
  state.mute.find((v) => v.keyword === id);
export const MutedNotificationsSelector = (state: SettingsLocalStore) => ({
  mutedNotifications: state.mutedNotifications,
  setMutedNotifications: state.setMutedNotifications,
});
export const DirectMessagesSelector = (state: SettingsLocalStore) => ({
  directMessages: state.directMessages,
  setDirectMessages: state.setDirectMessages,
});
export const SpacesSelector = (state: SettingsLocalStore) => ({
  spaces: state.spaces,
  setSpaces: state.setSpaces,
});
export const ContactsSelector = (state: SettingsLocalStore) => ({
  contacts: state.contacts,
  setContacts: state.setContacts,
});
export const AdsPreferencesSelector = (state: SettingsLocalStore) => ({
  adsPreferences: state.adsPreferences,
  setAdsPreferences: state.setAdsPreferences,
});
export const AllowBusinessPartnersSelector = (state: SettingsLocalStore) => ({
  allowBusinessPartners: state.allowBusinessPartners,
  setAllowBusinessPartners: state.setAllowBusinessPartners,
});
export const GrokSelector = (state: SettingsLocalStore) => ({
  grok: state.grok,
  setGrok: state.setGrok,
});
export const NotificationsSelector = (state: SettingsLocalStore) => ({
  notifications: state.notifications,
  setNotifications: state.setNotifications,
});
export const PushNotificationPermissionSelector = (
  state: SettingsLocalStore
) => ({
  permission: state.notifications.push.permission,
  setPermissions: state.setPushNotificationPermissions,
});
export const PushNotificationsSelector = (state: SettingsLocalStore) => ({
  push: state.notifications.push,
  setPushNotifications: state.setPushNotifications,
});
export const EmailNotificationActiveSelector = (state: SettingsLocalStore) => ({
  active: state.notifications.email.active,
  setActive: state.setEmailNotificationsActive,
});
export const EmailNotificationSelector = (state: SettingsLocalStore) => ({
  email: state.notifications.email,
  setEmail: state.setEmailNotifications,
});
export const AccessibilitySelector = (state: SettingsLocalStore) => ({
  accessibility: state.accessibility,
  setAccessibility: state.setAccessibility,
});
export const DisplaySelector = (state: SettingsLocalStore) => ({
  display: state.display,
  setDisplay: state.setDisplay,
});
export const DataSelector = (state: SettingsLocalStore) => ({
  data: state.data,
  setData: state.setData,
});
export const ConversationInfoSelector = (state: SettingsLocalStore) => ({
  conversationInfo: state.conversationInfo,
  setConverstationInfo: state.setConversationInfo,
});

export default useSettingsLocalStore;
