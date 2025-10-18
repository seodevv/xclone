'use client';

import Link from 'next/link';
import styles from './footer.buttons.module.css';
import AddMessageSvg from '@/app/_svg/_settings/AddMessageSvg';
import Text from '@/app/_component/_text/Text';
import { usePathname } from 'next/navigation';
import TweetSvg from '@/app/_svg/navbar/TweetSvg';

export default function FooterButtons() {
  const pathname = usePathname();
  let button = <></>;
  switch (pathname) {
    case '/home':
    case '/explore':
      button = (
        <Link className={styles.link} href={`/compose/post`}>
          <TweetSvg theme="white" width={24} />
          <div className={styles.title}>
            <Text theme="white" size="l" bold="bold">
              Post
            </Text>
          </div>
        </Link>
      );
      break;
    case '/messages':
      button = (
        <Link className={styles.link} href={`/messages/compose`}>
          <AddMessageSvg theme="white" width={24} />
          <div className={styles.title}>
            <Text theme="white" size="l" bold="bold">
              Direct Message
            </Text>
          </div>
        </Link>
      );
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dm}>{button}</div>
    </div>
  );
}
