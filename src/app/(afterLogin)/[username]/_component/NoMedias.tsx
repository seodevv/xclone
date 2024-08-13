import styles from '../_style/userPosts.module.css';

interface Props {
  type: 'all' | 'reply' | 'media' | 'like';
  username: string;
  isMine?: boolean;
}

export default function NoMedia({ type, username, isMine = false }: Props) {
  let title = `@${username} hasn\`t posted`;
  let message = 'When they do, their posts will show up here.';
  if (isMine) {
    if (type === 'all' || type === 'reply') return null;
  }

  if (type === 'media' && isMine) {
    title = 'Lights, camera ... attachments!';
    message = 'When you post photos or videos, they will show up here.';
  } else if (type === 'media' && !isMine) {
    title += ' media';
    message = 'Once they do, those posts will show up here.';
  } else if (type === 'like') {
    title = 'You don’t have any likes yet';
    message =
      'Tap the heart on any post to show it some love. When you do, it’ll show up here.';
  }

  return (
    <div className={styles.noMedia}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.message}>
        <span>{message}</span>
      </div>
    </div>
  );
}
