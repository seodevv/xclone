import styles from './iKeyboardShortcut.module.css';
import React from 'react';
import Text from '@/app/_component/_text/Text';

interface IList {
  title: string;
  data: { title: string; command: string[] }[];
}

export default function IKeyboardShortcut() {
  const navigation: IList = {
    title: 'Navigation',
    data: [
      { title: 'Shortcut help', command: ['?'] },
      { title: 'Next post', command: ['j'] },
      { title: 'Previous post', command: ['k'] },
      { title: 'Page down', command: ['Space'] },
      { title: 'Load new posts', command: ['.'] },
      { title: 'Home', command: ['g', 'h'] },
      { title: 'Explore', command: ['g', 'e'] },
      { title: 'Notifications', command: ['g', 'n'] },
      { title: 'Mentions', command: ['g', 'r'] },
      { title: 'Profile', command: ['g', 'p'] },
      { title: 'Drafts', command: ['g', 'f'] },
      { title: 'Scheduled posts', command: ['g', 't'] },
      { title: 'Likes', command: ['g', 'l'] },
      { title: 'Lists', command: ['g', 'i'] },
      { title: 'Direct Messages', command: ['g', 'm'] },
      { title: 'Settings', command: ['g', 's'] },
      { title: 'Bookmarks', command: ['g', 'b'] },
      { title: 'Go to user...', command: ['g', 'u'] },
      { title: 'Display settings', command: ['g', 'd'] },
    ],
  };
  const actions: IList = {
    title: 'Actions',
    data: [
      { title: 'New post', command: ['n'] },
      { title: 'Send post', command: ['CTRL', 'Enter'] },
      { title: 'New Direct Message', command: ['m'] },
      { title: 'Search', command: ['/'] },
      { title: 'Like', command: ['l'] },
      { title: 'Reply', command: ['r'] },
      { title: 'Repost', command: ['t'] },
      { title: 'Share post', command: ['s'] },
      { title: 'Bookmark', command: ['b'] },
      { title: 'Mute account', command: ['u'] },
      { title: 'Block account', command: ['x'] },
      { title: 'Open post details', command: ['Enter'] },
      { title: 'Expand photo', command: ['o'] },
      { title: 'Open/Close Messages dock', command: ['i'] },
    ],
  };
  const media: IList = {
    title: 'media',
    data: [
      { title: 'Pause/Play selected Video', command: ['k'] },
      { title: 'Pause/Play selected Video', command: ['space'] },
      { title: 'Mute selected Video', command: ['m'] },
      { title: 'Go to Audio Dock', command: ['a', 'd'] },
      { title: 'Play/Pause Audio Dock', command: ['a', 'space'] },
      { title: 'Mute/Unmute Audio Dock', command: ['a', 'm'] },
    ],
  };

  return (
    <div className={styles.container}>
      <CommandList list={navigation} />
      <CommandList list={actions} />
      <CommandList list={media} />
    </div>
  );
}

function CommandList({ list }: { list: IList }) {
  return (
    <div className={styles.commandList}>
      <div className={styles.title}>
        <Text size="fs_19" bold="boldest">
          {list.title}
        </Text>
      </div>
      <div className={styles.list}>
        {list.data.map((v) => (
          <div key={v.title + v.command[0]} className={styles.item}>
            <Text text={v.title} size="s" />
            <div className={styles.flex}>
              {v.command.map((c, i) => {
                if (i === 0) {
                  return (
                    <Text
                      key={v.title + c}
                      className={styles.command}
                      text={c}
                      align="center"
                    />
                  );
                }
                return (
                  <React.Fragment key={v.title + c}>
                    <Text text="+" size="s" align="center" />
                    <Text className={styles.command} text={c} align="center" />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
