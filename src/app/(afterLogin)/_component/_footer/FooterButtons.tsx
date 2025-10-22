'use client';

import Link from 'next/link';
import styles from './footer.buttons.module.css';
import AddMessageSvg from '@/app/_svg/_settings/AddMessageSvg';
import Text from '@/app/_component/_text/Text';
import TweetSvg from '@/app/_svg/navbar/TweetSvg';
import useFooterButtonStore from '@/app/(afterLogin)/_store/FooterButtonStore';
import CommentSvg from '@/app/_svg/actionbuttons/CommentSvg';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import NewListsSvg from '@/app/_svg/lists/NewListsSvg';

export default function FooterButtons() {
  const store = useFooterButtonStore();
  const reset = useComposeStore((state) => state.reset);
  let button = <></>;
  switch (store.type) {
    case 'post':
      button = (
        <Link
          className={styles.link}
          href={`/compose/post`}
          onClick={reset}
          scroll={false}
        >
          <TweetSvg theme="white" width={24} />
          <div className={styles.title}>
            <Text theme="white" size="l" bold="bold">
              Post
            </Text>
          </div>
        </Link>
      );
      break;
    case 'comment':
      button = (
        <Link className={styles.link} href={`/compose/post`} scroll={false}>
          <CommentSvg theme="white" width={24} />
          <div className={styles.title}>
            <Text theme="white" size="l" bold="bold">
              Comment
            </Text>
          </div>
        </Link>
      );
      break;
    case 'lists':
      button = (
        <Link className={styles.link} href={`/i/lists/create`} scroll={false}>
          <NewListsSvg theme="white" width={24} />
          <div className={styles.title}>
            <Text theme="white" size="l" bold="bold">
              Comment
            </Text>
          </div>
        </Link>
      );
      break;
    case 'dm':
      button = (
        <Link className={styles.link} href={`/messages/compose`} scroll={false}>
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

  if (!store.flag) return;

  return (
    <div className={styles.container}>
      <div className={styles.dm}>{button}</div>
    </div>
  );
}
