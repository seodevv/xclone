import { ISettingsProfile } from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfile';
import { ISettingsProfileOptions } from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfileEdit';
import { isSingleData } from '@/app/_lib/common';
import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { AdvancedPost } from '@/model/Post';
import { AdvancedUser, User } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  sessionId: User['id'];
  profile: Omit<ISettingsProfile, 'editor'>;
  updated: ISettingsProfileOptions['updated'];
}

const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      profile,
      updated,
    }: MutationParams): Promise<{ data: AdvancedUser; message: string }> => {
      const formData = new FormData();
      if (typeof profile.nickname !== 'undefined' && updated.nickname) {
        formData.append('nickname', profile.nickname);
      }
      if (typeof profile.desc !== 'undefined' && updated.desc) {
        formData.append('desc', profile.desc);
      }
      if (typeof profile.location !== 'undefined' && updated.location) {
        formData.append('location', profile.location);
      }
      if (typeof profile.refer !== 'undefined' && updated.refer) {
        formData.append('refer', profile.refer);
      }
      if (typeof profile.birth !== 'undefined' && updated.birth) {
        formData.append('birth', JSON.stringify(profile.birth));
      }
      formData.append('updated', JSON.stringify(updated));
      if (typeof profile.image?.file !== 'undefined' && updated.image) {
        formData.append('image', profile.image.file);
      }
      if (typeof profile.banner?.file !== 'undefined' && updated.banner) {
        formData.append('banner', profile.banner.file);
      }

      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/edit`;
      const requestInit: RequestInit = {
        method: 'POST',
        body: formData,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestInit);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, sessionId, profile, updated }) => {
      // queryKey
      // ['posts', *]
      // ['users', *]
      // ['lists', *]
      // ['hashtags', *]
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey);
      const context: {
        queryKey: QueryKey;
        queryData:
          | TData<AdvancedPost>
          | TData<AdvancedUser>
          | TData<AdvancedLists>
          | InfiniteData<TData<AdvancedPost[]>, number>
          | InfiniteData<TData<AdvancedUser[]>, string>
          | InfiniteData<TData<AdvancedLists[]>, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        switch (queryKey[0]) {
          case 'posts': {
            if (queryKey[1] === 'count') return;

            const queryData = queryClient.getQueryData<
              TData<AdvancedPost> | InfiniteData<TData<AdvancedPost[]>, number>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              const shallow: TData<AdvancedPost> = {
                ...queryData,
              };
              let shouldBeUpdate = false;
              if (shallow.data.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  User: {
                    ...shallow.data.User,
                    nickname: updated.nickname
                      ? profile.nickname
                      : shallow.data.User.nickname,
                    image:
                      updated.image && profile.image?.link
                        ? profile.image.link
                        : shallow.data.User.image,
                  },
                };
              }
              if (shallow.data.Parent?.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  Parent: {
                    ...shallow.data.Parent,
                    User: {
                      ...shallow.data.Parent.User,
                      nickname: updated.nickname
                        ? profile.nickname
                        : shallow.data.Parent.User.nickname,
                      image:
                        updated.image && profile.image?.link
                          ? profile.image.link
                          : shallow.data.Parent.User.image,
                    },
                  },
                };
              }
              if (shallow.data.Original?.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  Original: {
                    ...shallow.data.Original,
                    User: {
                      ...shallow.data.User,
                      nickname: updated.nickname
                        ? profile.nickname
                        : shallow.data.Original.User.nickname,
                      image:
                        updated.image && profile.image?.link
                          ? profile.image.link
                          : shallow.data.Original.User.image,
                    },
                  },
                };
              }

              if (shouldBeUpdate) {
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              }
            } else {
              const shallow: InfiniteData<TData<AdvancedPost[]>, number> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;
              queryData.pages.forEach((page, i) =>
                page.data.forEach((p, j) => {
                  if (
                    p.User.id !== sessionId &&
                    p.Parent?.User.id !== sessionId &&
                    p.Original?.User.id !== sessionId
                  ) {
                    return;
                  }

                  shallow.pages[i] = {
                    ...shallow.pages[i],
                    data: [...shallow.pages[i].data],
                  };
                  shallow.pages[i].data[j] = {
                    ...p,
                  };
                  if (p.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].User = {
                      ...p.User,
                      nickname: updated.nickname
                        ? profile.nickname
                        : p.User.nickname,
                      image:
                        updated.image && profile.image?.link
                          ? profile.image.link
                          : p.User.image,
                    };
                  }
                  if (p.Parent?.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].Parent = {
                      ...p.Parent,
                      User: {
                        ...p.Parent.User,
                        nickname: updated.nickname
                          ? profile.nickname
                          : p.Parent.User.nickname,
                        image:
                          updated.image && profile.image?.link
                            ? profile.image.link
                            : p.Parent.User.image,
                      },
                    };
                  }
                  if (p.Original?.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].Original = {
                      ...p.Original,
                      User: {
                        ...p.Original.User,
                        nickname: updated.nickname
                          ? profile.nickname
                          : p.Original.User.nickname,
                        image:
                          updated.image && profile.image?.link
                            ? profile.image.link
                            : p.Original.User.image,
                      },
                    };
                  }
                })
              );
              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              }
            }
            break;
          }
          case 'users': {
            const queryData = queryClient.getQueryData<
              TData<AdvancedUser> | InfiniteData<TData<AdvancedUser[]>, string>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              if (queryData.data.id !== sessionId) return;

              const shallow: TData<AdvancedUser> = {
                ...queryData,
                data: {
                  ...queryData.data,
                  nickname: updated.nickname
                    ? profile.nickname
                    : queryData.data.nickname,
                  desc: updated.desc ? profile.desc : queryData.data.desc,
                  location: updated.location
                    ? profile.location
                    : queryData.data.location,
                  refer: updated.refer ? profile.refer : queryData.data.refer,
                  birth: updated.birth ? profile.birth : queryData.data.birth,
                  image:
                    updated.image && profile.image?.link
                      ? profile.image.link
                      : queryData.data.image,
                  banner: updated.banner
                    ? profile.banner?.link
                      ? profile.banner.link
                      : undefined
                    : queryData.data.banner,
                },
              };

              queryClient.setQueryData(queryKey, shallow);
              context.push({ queryKey, queryData });
            } else {
              const shallow: InfiniteData<TData<AdvancedUser[]>, string> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;

              queryData.pages.forEach((page, i) =>
                page.data.forEach((u, j) => {
                  if (u.id !== sessionId) return;
                  shouldBeUpdated = true;
                  shallow.pages[i] = {
                    ...page,
                    data: [...page.data],
                  };
                  shallow.pages[i].data[j] = {
                    ...u,
                    nickname: updated.nickname ? profile.nickname : u.nickname,
                    desc: updated.desc ? profile.desc : u.desc,
                    location: updated.location ? profile.location : u.location,
                    refer: updated.refer ? profile.refer : u.refer,
                    birth: updated.birth ? profile.birth : u.birth,
                    image:
                      updated.image && profile.image?.link
                        ? profile.image.link
                        : u.image,
                    banner: updated.banner
                      ? profile.banner?.link
                        ? profile.banner.link
                        : undefined
                      : u.banner,
                  };
                })
              );

              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              }
            }
            break;
          }
          case 'lists': {
            const queryData = queryClient.getQueryData<
              | TData<AdvancedLists>
              | InfiniteData<TData<AdvancedLists[]>, number>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              if (queryData.data.User.id !== sessionId) return;
              const shallow: TData<AdvancedLists> = {
                ...queryData,
                data: {
                  ...queryData.data,
                  User: {
                    ...queryData.data.User,
                    nickname: updated.nickname
                      ? profile.nickname
                      : queryData.data.User.nickname,
                    image:
                      updated.image && profile.image?.link
                        ? profile.image.link
                        : queryData.data.User.image,
                  },
                },
              };
              queryClient.setQueryData(queryKey, shallow);
              context.push({ queryKey, queryData });
            } else {
              const shallow: InfiniteData<TData<AdvancedLists[]>, number> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;
              queryData.pages.forEach((page, i) =>
                page.data.forEach((l, j) => {
                  if (l.User.id !== sessionId) return;
                  shouldBeUpdated = true;
                  shallow.pages[i] = {
                    ...page,
                    data: [...page.data],
                  };
                  shallow.pages[i].data[j] = {
                    ...l,
                    User: {
                      ...l.User,
                      nickname: updated.nickname
                        ? profile.nickname
                        : l.User.nickname,
                      image:
                        updated.image && profile.image?.link
                          ? profile.image.link
                          : l.User.image,
                    },
                  };
                })
              );

              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              }
            }
            break;
          }
        }
      });
      return context;
    },
    onSuccess: (response, { queryClient, sessionId }, context) => {
      context.forEach(({ queryKey }) => {
        const image = response.data.image;
        const banner = response.data.banner;
        switch (queryKey[0]) {
          case 'posts': {
            const queryData = queryClient.getQueryData<
              TData<AdvancedPost> | InfiniteData<TData<AdvancedPost[]>, number>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              if (queryData.data.User.id !== sessionId) return;
              const shallow: TData<AdvancedPost> = {
                ...queryData,
              };
              let shouldBeUpdate = false;
              if (shallow.data.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  User: {
                    ...shallow.data.User,
                    image,
                  },
                };
              }
              if (shallow.data.Parent?.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  Parent: {
                    ...shallow.data.Parent,
                    User: {
                      ...shallow.data.Parent.User,
                      image,
                    },
                  },
                };
              }
              if (shallow.data.Original?.User.id === sessionId) {
                shouldBeUpdate = true;
                shallow.data = {
                  ...shallow.data,
                  Original: {
                    ...shallow.data.Original,
                    User: {
                      ...shallow.data.User,
                    },
                  },
                };
              }

              if (shouldBeUpdate) {
                queryClient.setQueryData(queryKey, shallow);
              }
            } else {
              const shallow: InfiniteData<TData<AdvancedPost[]>, number> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;
              queryData.pages.forEach((page, i) =>
                page.data.forEach((p, j) => {
                  if (
                    p.User.id !== sessionId &&
                    p.Parent?.User.id !== sessionId &&
                    p.Original?.User.id !== sessionId
                  ) {
                    return;
                  }

                  shallow.pages[i] = {
                    ...shallow.pages[i],
                    data: [...shallow.pages[i].data],
                  };
                  shallow.pages[i].data[j] = {
                    ...p,
                  };
                  if (p.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].User = {
                      ...p.User,
                      image,
                    };
                  }
                  if (p.Parent?.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].Parent = {
                      ...p.Parent,
                      User: {
                        ...p.Parent.User,
                        image,
                      },
                    };
                  }
                  if (p.Original?.User.id === sessionId) {
                    shouldBeUpdated = true;
                    shallow.pages[i].data[j].Original = {
                      ...p.Original,
                      User: {
                        ...p.Original.User,
                        image,
                      },
                    };
                  }
                })
              );
              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
              }
            }
            break;
          }
          case 'users': {
            const queryData = queryClient.getQueryData<
              TData<AdvancedUser> | InfiniteData<TData<AdvancedUser[]>, string>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              if (queryData.data.id !== sessionId) return;

              const shallow: TData<AdvancedUser> = {
                ...queryData,
                data: {
                  ...queryData.data,
                  image,
                  banner,
                },
              };

              queryClient.setQueryData(queryKey, shallow);
            } else {
              const shallow: InfiniteData<TData<AdvancedUser[]>, string> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;

              queryData.pages.forEach((page, i) =>
                page.data.forEach((u, j) => {
                  if (u.id !== sessionId) return;
                  shouldBeUpdated = true;
                  shallow.pages[i] = {
                    ...page,
                    data: [...page.data],
                  };
                  shallow.pages[i].data[j] = {
                    ...u,
                    image,
                    banner,
                  };
                })
              );

              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
              }
            }
            break;
          }
          case 'lists': {
            const queryData = queryClient.getQueryData<
              | TData<AdvancedLists>
              | InfiniteData<TData<AdvancedLists[]>, number>
            >(queryKey);
            if (!queryData) return;

            if (isSingleData(queryData)) {
              if (queryData.data.User.id !== sessionId) return;
              const shallow: TData<AdvancedLists> = {
                ...queryData,
                data: {
                  ...queryData.data,
                  User: {
                    ...queryData.data.User,
                    image,
                  },
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            } else {
              const shallow: InfiniteData<TData<AdvancedLists[]>, number> = {
                ...queryData,
                pages: [...queryData.pages],
              };
              let shouldBeUpdated = false;
              queryData.pages.forEach((page, i) =>
                page.data.forEach((l, j) => {
                  if (l.User.id !== sessionId) return;
                  shouldBeUpdated = true;
                  shallow.pages[i] = {
                    ...page,
                    data: [...page.data],
                  };
                  shallow.pages[i].data[j] = {
                    ...l,
                    User: {
                      ...l.User,
                      image,
                    },
                  };
                })
              );

              if (shouldBeUpdated) {
                queryClient.setQueryData(queryKey, shallow);
              }
            }
            break;
          }
        }
      });
    },
    onError: (error, { queryClient }, context) => {
      console.error(error);
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useUpdateProfileMutation;

interface TData<T> {
  data: T;
  nextCursor?: number | string;
  message: string;
}