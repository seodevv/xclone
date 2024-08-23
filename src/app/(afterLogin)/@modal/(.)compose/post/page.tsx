import styles from './compose.post.module.css';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import ComposePostHeader from '@/app/(afterLogin)/@modal/(.)compose/post/_component/ComposePostHeader';
import { getServerSession } from 'next-auth';
import ComposePostBody from '@/app/(afterLogin)/@modal/(.)compose/post/_component/ComposePostBody';
import authOptions from '@/app/_lib/authOptions';
import ComposePostBackground from '@/app/(afterLogin)/@modal/(.)compose/post/_component/ComposePostBackground';

export default async function ComposePostSlot() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <ComposePostBackground>
      <HtmlOverflowHidden />
      <section className={styles.modal}>
        <div className={styles.compose}>
          <ComposePostHeader />
          <ComposePostBody session={session} />
        </div>
      </section>
    </ComposePostBackground>
  );
}
