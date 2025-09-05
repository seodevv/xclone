'use client';

import styles from './HighlightModal.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import Link from 'next/link';
import { useContext, useState } from 'react';
import usePostPinnedMutation from '@/app/(afterLogin)/_hooks/usePostPinnedMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { AdvancedPost } from '@/model/Post';

interface Props {
  post: AdvancedPost;
  sessionid: string;
}

export default function HighlightModal({ post, sessionid }: Props) {
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const [alter, setAlter] = useState(false);
  const pinMutation = usePostPinnedMutation();
  const { alterMessage } = useAlterModal();

  const onClickHighlight = () => {
    setAlter(true);
  };
  const onClickPin = () => {
    pinMutation.mutate({
      method: 'post',
      postid: post.postid,
      sessionid,
    });

    alterMessage('Your post was pinned to your profile.');
    close();
  };
  const onClickClose = () => {
    dispatchMenu({
      type: 'set',
      payload: { status: { type: 'post', post, sessionid } },
    });
  };

  return (
    <IBackground onClick={onClickClose}>
      <IHeader noBack onClick={onClickClose} />
      <div className={styles.container}>
        <div className={cx(styles.inner, alter && utils.mb_0)}>
          <div className={styles.texts}>
            <div className={styles.title}>
              <span>Highlight your best content instead</span>
            </div>
            <div className={styles.sub}>
              With Highlights, you can curate all your best posts on your
              profile.
            </div>
          </div>
          <div className={styles.buttons}>
            <FlexButton
              text="Highlight"
              large
              style={{ margin: 0 }}
              onClick={onClickHighlight}
            />
            <FlexButton
              theme="reverse"
              text="Pin"
              large
              style={{ margin: '16px 0 0 0' }}
              onClick={onClickPin}
            />
            <FlexButton
              theme="reverse"
              text="Cancel"
              large
              style={{ margin: '16px 0 0 0' }}
              onClick={onClickClose}
            />
          </div>
          {alter && (
            <div className={cx(styles.alter, utils.maxHeight)}>
              <div className={styles.message}>
                <span>
                  Highlighting posts is a subscription feature. Get verified to
                  unlock this feature and others.
                </span>
              </div>
              <Link
                href="/i/verified-choose"
                scroll={false}
                className={styles.link}
                onClick={() => close()}
              >
                Get Verified
              </Link>
            </div>
          )}
        </div>
      </div>
    </IBackground>
  );
}
