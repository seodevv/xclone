'use client';

import styles from './afterLogin.component.postFormFeatrues.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
} from 'react';
import FileUploader, {
  FileRef,
} from '@/app/(afterLogin)/_component/upload/FileUploader';
import GifPicker from '@/app/(afterLogin)/_component/gif/GifPicker';
import EmojiSelector from '@/app/(afterLogin)/_component/emoji/EmojiSelector';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';
import ProgressSvg from '@/app/_svg/tweet/ProgressSvg';
import { MediaType } from '@/app/(afterLogin)/_component/post/form/PostForm';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { getFileDataURL, getImageMeta } from '@/app/_lib/common';

interface Props {
  isComment?: boolean;
  images: MediaType[];
  setImages: Dispatch<SetStateAction<MediaType[]>>;
  content: string;
  maxContent?: number;
  setContent: Dispatch<SetStateAction<string>>;
  lastSelection: number;
  setLastSelection: Dispatch<SetStateAction<number>>;
  onFocusEmoji?: () => void;
}

export default function PostFormFeature({
  isComment = false,
  images,
  setImages,
  content,
  maxContent = 280,
  setContent,
  lastSelection,
  setLastSelection,
  onFocusEmoji,
}: Props) {
  const { alterMessage } = useAlterModal();
  const fileRef = useRef<FileRef>(null);

  const onChangeUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;

    if (!files) return;
    if (files.length + images.length > 4) {
      fileRef.current?.reset();
      alterMessage('Please choose up to 4 photos, videos, or GIFs.');
      return;
    }

    for (let file of files) {
      if (file.size >= 1024 * 1024 * 10) {
        fileRef.current?.reset();
        alterMessage('The maximum allowed size of an image file is 10MB.');
        return;
      }

      const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
      if (!['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
        fileRef.current?.reset();
        alterMessage(
          'Please upload only the correct format(png, jpg, webp, gif).'
        );
        return;
      }

      try {
        const result = await Promise.all([
          getFileDataURL(file),
          getImageMeta(file),
        ]);

        setImages((prev) => [
          ...prev,
          { type: 'image', link: result[0], file, ...result[1] },
        ]);
      } catch (error) {
        fileRef.current?.reset();
        alterMessage('Please upload the correct image file.');
        return;
      }
    }
    fileRef.current?.reset();
  };
  const onClickLocation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cx(styles.features, utils.fadeIn)}>
      <div className={styles.feature}>
        <FileUploader
          className={styles.funcButton}
          ref={fileRef}
          onChange={onChangeUpload}
          disabled={images.length === 4}
        />
        <GifPicker
          className={styles.funcButton}
          setState={setImages}
          disabled={images.length === 4}
        />
        <EmojiSelector
          className={styles.funcButton}
          setState={setContent}
          lastSelection={lastSelection}
          setLastSelection={setLastSelection}
          onFocus={onFocusEmoji}
        />
        <button
          type="button"
          className={styles.funcButton}
          onClick={onClickLocation}
          disabled
        >
          <LocationSvg />
        </button>
      </div>
      <div className={cx(utils.d_flexRow, utils.flex_alignCenter)}>
        <ProgressSvg value={content.length} maxValue={maxContent} />
        <button
          type="submit"
          className={styles.actionButton}
          disabled={!content && images.length === 0}
        >
          {isComment ? 'Reply' : 'Post'}
        </button>
      </div>
    </div>
  );
}
