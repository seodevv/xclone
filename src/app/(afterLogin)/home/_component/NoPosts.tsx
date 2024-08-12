import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import styles from './afterLogin.home.noPost.module.css';

export default function NoPosts() {
  const title = 'Welcome to X!';
  const sub =
    'This is the best place to see what’s happening in your world. Find some people and topics to follow now.';
  return (
    <section className={styles.noPost}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.sub}>{sub}</div>
        <div className={styles.link}>
          <TextLink
            className={styles.linkBtn}
            href="/i/connect_people"
            text="Let`s go"
            type="primary"
            style={{
              paddingLeft: 32,
              paddingRight: 32,
              minWidth: 52,
              minHeight: 52,
            }}
          />
        </div>
      </div>
    </section>
  );
}
