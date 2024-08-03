import styles from './userFollowContent.module.css';

interface Props {
  type: 'verified_followers' | 'follow' | 'following';
}

export default function UserFollowNoContent({ type }: Props) {
  let title;
  let sub;
  switch (type) {
    case 'verified_followers':
      title = 'You don’t have any verified followers yet';
      sub = 'When a verified account follows you, you’ll see them here.';
      break;
    case 'follow':
      title = 'Looking for followers?';
      sub =
        'When someone follows this account, they’ll show up here. Posting and interacting with others helps boost followers.';
      break;
    case 'following':
      title = 'Be in the know';
      sub =
        'Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.';
      break;
  }

  return (
    <div className={styles.noContent}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.sub}>
        <span>{sub}</span>
      </div>
    </div>
  );
}
