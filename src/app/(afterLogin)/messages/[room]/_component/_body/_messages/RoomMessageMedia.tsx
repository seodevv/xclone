'use client';

import useMessagesStore from '@/app/(afterLogin)/_store/MessagesStore';
import { generateImagePath } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import { AdvancedMessages } from '@/model/Message';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  media: AdvancedMessages['Media'];
}

export default function RoomMessageMedia({ media }: Props) {
  const pathname = usePathname();
  const { setMedia } = useMessagesStore();

  const onClickMedia = () => setMedia(media);

  if (!media) return null;

  const ratio = ((media.height / media.width) * 100).toFixed(4);

  return (
    <div
      className={cx(
        utils.d_flexColumn,
        utils.br_24,
        utils.box_media,
        utils.of_hide
      )}
    >
      <Link
        href={`${pathname}/media/${media.id}`}
        className={cx(utils.relative, utils.cursor_point)}
        scroll={false}
        onClick={onClickMedia}
      >
        <div
          className={cx(utils.w_100p)}
          style={{ paddingBottom: `${ratio}%` }}
        ></div>
        <div className={cx(utils.absolute, utils.t_r_b_l_0, utils.w_100p)}>
          <Image
            className={cx(utils.w_100p, utils.h_100p)}
            src={generateImagePath(media.url)}
            alt={media.url}
            width={media.width}
            height={media.height}
          />
        </div>
      </Link>
    </div>
  );
}
