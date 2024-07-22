'use client';

import styles from './gifPicker.module.css';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import Gif, { TenorImage, Theme } from 'gif-picker-react';
import { MediaType } from '../../[username]/status/[id]/_component/CommentForm';
import useAlterModal from '../../_hooks/useAlterModal';
import GifSvg from '@/app/_svg/tweet/GifSvg';

interface Props {
  className?: string;
  state?: MediaType[];
  setState?: Dispatch<SetStateAction<MediaType[]>>;
  disabled?: boolean;
}

export default function GifPicker({
  className,
  state,
  setState,
  disabled,
}: Props) {
  const { alterMessage } = useAlterModal();
  const [active, setActive] = useState(false);

  const onClickActive: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActive((prev) => !prev);
  };

  const onClickClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  };

  const onClickGif = (gif: TenorImage) => {
    if (typeof setState === 'function') {
      setState((prev) => {
        if (prev.length === 4) {
          alterMessage('Please choose up to 4 photos, videos, or GIFs.');
          return prev;
        }
        return [
          ...prev,
          { type: 'gif', link: gif.url, width: gif.width, height: gif.height },
        ];
      });
    }
    setActive(false);
  };

  return (
    <div className={styles.gifPicker}>
      <button className={className} onClick={onClickActive} disabled={disabled}>
        <GifSvg />
      </button>
      {active && (
        <div className={styles.gifOutside} onClick={onClickClose}>
          <div className={styles.gifContainer}>
            <Gif
              tenorApiKey={`${process.env.NEXT_PUBLIC_TENOR_API}`}
              onGifClick={onClickGif}
              theme={Theme.AUTO}
              autoFocusSearch
              width={'100%'}
              height={'100%'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
