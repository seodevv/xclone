'use client';

import styles from './room.header.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import { decryptRoomId, generateImagePath } from '@/app/_lib/common';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@/app/_component/_text/Text';
import InformSvg from '@/app/_svg/input/InformSvg';
import { useSelectedLayoutSegment } from 'next/navigation';
import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import { useEffect, useLayoutEffect, useState } from 'react';

interface Props {
  sessionId: string;
  roomId: string;
}

export default function RoomHeader({ sessionId, roomId }: Props) {
  const receiverId = decryptRoomId({ userId: sessionId, roomId });
  const { data: user } = useUserQuery(receiverId);
  const segment = useSelectedLayoutSegment();
  const { width } = useViewport();
  const [back, setBack] = useState(false);

  useLayoutEffect(() => {
    if (width !== 0 && width < 1024) {
      setBack(true);
    } else {
      setBack(false);
    }
  }, []);

  if (typeof user !== 'undefined') {
    return (
      <div className={styles.sticky}>
        <div className={styles.background}>
          <div className={styles.header}>
            <div className={styles.info}>
              <div className={cx(utils.d_flexRow, utils.flex_alignCenter)}>
                {segment === 'info' ? (
                  <>
                    <BackButton prevPath={`/messages/${roomId}`} />
                    <div>
                      <Text
                        className={cx(utils.pt_2, utils.pb_2, utils.of_hide)}
                        text="Conversation info"
                        size="l"
                        bold="bold"
                        whiteSpace="nowrap"
                        overflow="ellipsis"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cx(utils.d_flexRow, utils.flexGrow_1)}>
                      {back && <BackButton prevPath="/messages" />}
                      <div className={styles.profile}>
                        <div className={styles.pad}></div>
                        <div className={styles.absolute}>
                          <Link
                            className={styles.profile}
                            href={`/${user.data.id}`}
                            scroll={false}
                          >
                            <Image
                              src={generateImagePath(user.data.image)}
                              alt={user.data.image}
                              width={32}
                              height={32}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className={styles.nickname}>
                        <Text
                          className={cx(utils.pt_2, utils.pb_2, utils.of_hide)}
                          text={user.data.nickname}
                          size="l"
                          bold="bold"
                          whiteSpace="nowrap"
                          overflow="ellipsis"
                        />
                      </div>
                    </div>
                    <div className={styles.detail}>
                      <div className={utils.d_flexRow}>
                        <Link
                          className={cx(utils.transit_basic, styles.detailLink)}
                          href={`/messages/${roomId}/info`}
                        >
                          <InformSvg width={20} white />
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
