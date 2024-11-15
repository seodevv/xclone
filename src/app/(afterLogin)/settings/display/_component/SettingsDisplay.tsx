'use client';

import Post from '@/app/(afterLogin)/_component/post/Post';
import { AdvancedPost } from '@/model/Post';
import SettingsDisplayFontSize from '@/app/(afterLogin)/settings/display/_component/SettingsDisplayFontSize';
import SettingsDisplayColor from '@/app/(afterLogin)/settings/display/_component/SettingsDisplayColor';
import SettingsDisplayBackground from '@/app/(afterLogin)/settings/display/_component/SettingsDisplayBackground';

export default function SettingsDisplay() {
  const post: AdvancedPost = {
    postid: 0,
    userid: 'X',
    User: {
      id: 'X',
      nickname: 'X',
      image: 'x.jpg',
      verified: {
        type: 'blue',
        date: new Date(),
      },
    },
    content:
      'At the heart of X are short messages called posts — just like this one — which can include photos, videos, links, text, hashtags, and mentions like @X',
    images: [],
    createat: new Date(new Date().getTime() - 1000 * 60 * 13).toISOString(),
    pinned: false,
    quote: false,
    scope: 'every',
    originalid: null,
    Original: null,
    parentid: null,
    Parent: null,
    Hearts: [],
    Reposts: [],
    Comments: [],
    Bookmarks: [],
    _count: {
      Hearts: 0,
      Reposts: 0,
      Comments: 0,
      Bookmarks: 0,
      Views: 0,
    },
  };

  return (
    <div>
      <Post post={post} noReact noEvent noImage />
      <SettingsDisplayFontSize />
      <SettingsDisplayColor />
      <SettingsDisplayBackground />
    </div>
  );
}
