'use client';

import { RoomMessageImageFile } from '@/app/(afterLogin)/messages/[room]/_component/_body/_sender/RoomMessageSender';
import { generateImagePath } from '@/app/_lib/common';
import EditSvg from '@/app/_svg/tweet/EditSvg';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface Props {
  media: RoomMessageImageFile | null;
  setMedia: Dispatch<SetStateAction<Props['media']>>;
}

export default function RoomMessageMediaPreview({ media, setMedia }: Props) {
  const onClickEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };
  const onClickXmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setMedia(null);
  };

  if (!media) return null;

  return (
    <div className={cx(utils.ma_12, utils.relative, utils.h_max_10rem)}>
      <div
        className={cx(
          utils.pb_200p,
          utils.relative,
          utils.zIndex_xs,
          utils.w_100p
        )}
      ></div>
      <div
        className={cx(
          utils.absolute,
          utils.t_r_b_l_0,
          utils.w_100p,
          utils.h_100p
        )}
      >
        <div className={cx(utils.d_flexRow, utils.h_100p)}>
          <div
            className={cx(
              utils.relative,
              utils.w_min_10em,
              utils.br_16,
              utils.cursor_point,
              utils.of_hide
            )}
            style={{}}
          >
            <div className={cx(utils.absolute, utils.t_r_b_l_0)}>
              <Image
                className={cx(utils.w_100p, utils.h_100p, utils.obj_cover)}
                src={generateImagePath(media.url)}
                alt=""
                width={media.width}
                height={media.height}
              />
            </div>
            <div
              className={cx(
                utils.absolute,
                utils.t_4,
                utils.l_4,
                utils.d_flexRow,
                utils.flex_alignStretch,
                utils.gap_4
              )}
            >
              <button
                className={cx(
                  utils.w_min_24,
                  utils.h_min_24,
                  utils.bg_gray_a_75,
                  utils.hover_bg_gray_a_75,
                  utils.active_bg_gray_a_75,
                  utils.backdrop_blur_s,
                  utils.bd_none,
                  utils.br_9999,
                  utils.transit_basic,
                  utils.cursor_point
                )}
                type="button"
                onClick={onClickEdit}
              >
                <EditSvg width={16} theme="white" />
              </button>
            </div>
            <button
              className={cx(
                utils.absolute,
                utils.t_4,
                utils.r_4,
                utils.w_min_32,
                utils.h_min_32,
                utils.bg_gray_a_75,
                utils.hover_bg_gray_a_75,
                utils.active_bg_gray_a_75,
                utils.backdrop_blur_s,
                utils.bd_none,
                utils.br_9999,
                utils.transit_basic,
                utils.cursor_point
              )}
              type="button"
              onClick={onClickXmark}
            >
              <XMarkSvg width={18} theme="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
