'use client';

import styles from './afterLogin.component.postFormPreview.module.css';
import utils from '@/app/utility.module.css';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { MediaType } from './PostForm';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import RightArrowSvg from '@/app/_svg/arrow/RightArrowSvg';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';
import EditSvg from '@/app/_svg/tweet/EditSvg';

interface Props {
  images: MediaType[];
  setImages: Dispatch<SetStateAction<MediaType[]>>;
}

export default function PostFormPreview({ images, setImages }: Props) {
  const [current, setCurrent] = useState<'prev' | 'next'>('prev');
  const length = images.length;
  const isSingle = images.length === 1;
  const isFull = images.length === 4;

  let translateX: CSSProperties['transform'] = 'unset';
  if (current === 'next') {
    translateX = `translateX(calc(${isFull ? -200 : -100}% - 8px)`;
  }

  if (images.length === 0) return null;

  return (
    <div className={cx(styles.preview, utils.fadeIn)}>
      <div className={cx(utils.d_flexRow)}>
        {images.map((image, i) => (
          <div
            key={i}
            className={cx(
              styles.previewImageBox,
              utils.fadeIn,
              isSingle && [utils.mr_0, utils.ml_0, utils.w_100]
            )}
            style={{ transform: translateX }}
          >
            <Image
              className={cx(
                styles.previewImage,
                isSingle && [utils.h_auto, utils.ratio_unset]
              )}
              src={image.link}
              alt=""
              width={image.width}
              height={image.height}
              unoptimized={image.type === 'gif'}
            />
            {image.type === 'gif' && (
              <div className={styles.refer}>
                <span>via</span>
                <img
                  className={styles.brandLogo}
                  src="https://abs.twimg.com/a/1501527574/img/t1/icon_riffsy.png"
                  alt=""
                />
                <span className={utils.fw_bold}>TENOR</span>
              </div>
            )}
            {image.type === 'image' && (
              <button type="button" className={styles.previewEdit}>
                <EditSvg white />
              </button>
            )}
            <button
              type="button"
              className={styles.previewCancle}
              onClick={() => {
                setImages((prev) => {
                  const copy = [...prev];
                  copy.splice(i, 1);
                  return copy;
                });
                if (images.length < 4) setCurrent('prev');
              }}
            >
              <XMarkSvg white />
            </button>
          </div>
        ))}
      </div>
      {length > 2 && (
        <>
          {current === 'next' ? (
            <button
              type="button"
              className={cx(styles.previewCarousel, styles.previewCarouselLeft)}
              onClick={() => setCurrent('prev')}
            >
              <LeftArrowSvg width={20} white />
            </button>
          ) : (
            <button
              type="button"
              className={cx(
                styles.previewCarousel,
                styles.previewCarouselRight
              )}
              onClick={() => setCurrent('next')}
            >
              <RightArrowSvg width={20} white />
            </button>
          )}
        </>
      )}
    </div>
  );
}
