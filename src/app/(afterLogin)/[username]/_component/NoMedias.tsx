import NoPost from '@/app/(afterLogin)/_component/post/NoPost';

interface Props {
  type: 'all' | 'reply' | 'media' | 'like';
  username: string;
  isOwn?: boolean;
}

export default function NoMedia({ type, username, isOwn = false }: Props) {
  switch (isOwn) {
    case true:
      if (['all', 'reply'].includes(type)) {
        return null;
      }
      if (type === 'media') {
        return (
          <NoPost
            title="Lights, camera ... attachments!"
            message="When you post photos or videos, they will show up here."
          />
        );
      }
      break;
    case false:
      if (type === 'media') {
        return (
          <NoPost
            title={`@${username} hasn\`t posted media`}
            message="Once they do, those posts will show up here."
          />
        );
      }
      if (type === 'like') {
        return (
          <NoPost
            title="You don’t have any likes yet"
            message="Tap the heart on any post to show it some love. When you do, it’ll show up here."
          />
        );
      }
      break;
  }

  return (
    <NoPost
      title={`@${username} hasn\`t posted`}
      message="When they do, their posts will show up here."
    />
  );
}
