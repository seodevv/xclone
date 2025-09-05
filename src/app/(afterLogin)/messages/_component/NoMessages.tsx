import Link from 'next/link';
import styles from './noMessages.module.css';
import Text from '@/app/_component/_text/Text';

interface Props {
  title?: string;
  sub?: string;
  href?: string;
  linkText?: string;
  noLink?: boolean;
}

export default function NoMessages({
  title = 'Welcome to your inbox!',
  sub = 'Drop a line, share posts and more with private conversations between you and others on X.',
  href = '/messages/compose',
  linkText = 'Write a message',
  noLink,
}: Props) {
  return (
    <div className={styles.container}>
      <Text className={styles.title} size="fs_29" bold="boldest">
        {title}
      </Text>
      <Text className={styles.sub} theme="gray">
        {sub}
      </Text>
      {!noLink && (
        <Link className={styles.link} href={href} scroll={false}>
          <Text size="s" bold="bold">
            {linkText}
          </Text>
        </Link>
      )}
    </div>
  );
}
