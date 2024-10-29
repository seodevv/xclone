import Text from '@/app/_component/_text/Text';
import styles from './link.module.css';
import cx from 'classnames';
import Link from 'next/link';

interface Props {
  className?: string;
  href: string;
  content: string | JSX.Element;
  height?: number;
  scroll?: boolean;
}

export default function FlexLink({
  className,
  href,
  content,
  height = 48,
  scroll = false,
}: Props) {
  return (
    <Link
      className={cx(styles.flexLink, className)}
      style={{ minHeight: height }}
      href={href}
      scroll={scroll}
    >
      <Text theme="primary">{content}</Text>
    </Link>
  );
}
