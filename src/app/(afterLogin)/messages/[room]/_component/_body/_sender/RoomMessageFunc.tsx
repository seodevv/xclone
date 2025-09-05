'use client';

import EmojiSelector, {
  EmojiProps,
} from '@/app/(afterLogin)/_component/emoji/EmojiSelector';
import GifPicker from '@/app/(afterLogin)/_component/gif/GifPicker';
import FileUploader, {
  FileRef,
} from '@/app/(afterLogin)/_component/upload/FileUploader';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { getFileDataURL, getImageMeta } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import { MessageMediaData } from '@/model/socket';
import cx from 'classnames';
import { TenorImage } from 'gif-picker-react';
import { ChangeEventHandler, useRef } from 'react';

interface Props {
  onLoadedFile?: (data: MessageMediaData) => void;
  onLoadedGif?: (gif: TenorImage) => void;
  onLoadedEmoji?: (emoji: EmojiProps) => void;
  onFocusCloseEmoji?: () => void;
}

export default function RoomMessageFunc({
  onLoadedFile,
  onLoadedGif,
  onLoadedEmoji,
  onFocusCloseEmoji,
}: Props) {
  const { alterMessage } = useAlterModal();
  const fileRef = useRef<FileRef>(null);

  const onChangeUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (typeof onLoadedFile !== 'function') return;

    const file = e.target.files?.item(0);
    if (!file) return;

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

    const url = await getFileDataURL(file);
    const { width, height } = await getImageMeta(file);
    onLoadedFile({
      type: 'image',
      url,
      width,
      height,
      file,
      filename: file.name,
    });
  };

  const onSuccessGif = (gif: TenorImage) => {
    if (typeof onLoadedGif !== 'function') return;
    onLoadedGif(gif);
  };

  const onSuccessEmoji = (emoji: EmojiProps) => {
    if (typeof onLoadedEmoji !== 'function') return;
    onLoadedEmoji(emoji);
  };

  const funcClass = cx(
    utils.d_flexColumn,
    utils.flex_alignCenter,
    utils.flex_justiCenter,
    utils.w_min_36,
    utils.h_min_36,
    utils.bg_trans,
    utils.bd_1_solid_trans,
    utils.br_9999,
    utils.outline_none,
    utils.transit_basic,
    utils.ma_0,
    utils.hover_bg_primary_a_1,
    utils.active_bg_primary_a_2,
    utils.cursor_point
  );

  return (
    <div className={cx(utils.mr_4, utils.d_flexRow)}>
      <FileUploader
        className={funcClass}
        theme="primary"
        ref={fileRef}
        onChange={onChangeUpload}
      />
      <GifPicker
        className={funcClass}
        theme="primary"
        onSuccess={onSuccessGif}
      />
      <EmojiSelector
        className={funcClass}
        theme="primary"
        onSuccess={onSuccessEmoji}
        onFocus={onFocusCloseEmoji}
      />
    </div>
  );
}
