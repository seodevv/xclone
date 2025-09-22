'use client';

import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import useMessagesStore from '@/app/(afterLogin)/_store/MessagesStore';
import { generateImagePath } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Color from 'color-thief-react';
import Image from 'next/image';

interface Props {
  params: { room: string; imageid: string };
}

export default function MessagesImageModal({ params }: Props) {
  const { media } = useMessagesStore();
  const { height } = useViewport();

  if (media === null) return null;
  if (height === null) return null;

  const url = generateImagePath(media.url);

  return (
    <Color src={url} format="rgbArray" crossOrigin="anonymous">
      {({ data, loading, error }) => {
        const backgroundColor =
          typeof data !== 'undefined'
            ? `rgba(${data[0]}, ${data[1]}, ${data[2]}, 0.75)`
            : undefined;
        const heightRatio = media.height > height ? height / media.height : 1;

        if (loading) {
          return (
            <IBackground
              className={cx(
                utils.d_flexColumn,
                utils.flex_alignCenter,
                utils.flex_justiCenter
              )}
              color="none"
              xmark
            >
              <LoadingSpinner />
            </IBackground>
          );
        }

        return (
          <IBackground
            className={cx(utils.d_flexColumn)}
            size="none"
            style={{ backgroundColor }}
            xmark
          >
            <div
              className={cx(
                utils.d_flexColumn,
                utils.flex_alignCenter,
                utils.flex_justiCenter,
                utils.flex_1,
                utils.h_max_100dvh,
                utils.of_hide
              )}
            >
              <Image
                className={cx(utils.obj_contain)}
                src={url}
                alt={media.url}
                width={media.width * heightRatio}
                height={media.height * heightRatio}
              />
            </div>
          </IBackground>
        );
      }}
    </Color>
  );
}
