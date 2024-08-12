import styles from './afterLogin.compose.post.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import ComposePostHeader from '@/app/(afterLogin)/@modal/(.)compose/post/_component/ComposePostHeader';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ComposePostBody from '@/app/(afterLogin)/@modal/(.)compose/post/_component/ComposePostBody';

export default async function ComposePostSlot() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <main
      className={cx(
        utils.fixed,
        utils.t_r_b_l_0,
        utils.d_flexColumn,
        utils.flex_alignCenter,
        utils.zIndex_xxxl,
        utils.fadeIn,
        styles.background
      )}
    >
      <HtmlOverflowHidden />
      <section className={styles.modal}>
        <div className={styles.compose}>
          <ComposePostHeader />
          <ComposePostBody session={session} />
        </div>
      </section>
    </main>
  );
}
