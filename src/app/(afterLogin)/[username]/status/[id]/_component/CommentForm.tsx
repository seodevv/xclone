'use client';

import style from '../_style/commentForm.module.css';
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import cx from 'classnames';
import MyProfile from '@/app/(afterLogin)/_component/profile/MyProfile';
import FileUploader, {
  FileRef,
} from '@/app/(afterLogin)/_component/upload/FileUploader';
import CommentFormPreview from './CommentFormPreview';
import useAlterModal from '@/app/(afterLogin)/_hooks/useAlterModal';
import { getFileDataURL, getImageMeta } from '@/app/_lib/common';
import GifPicker from '@/app/(afterLogin)/_component/gif/GifPicker';
import EmojiSelector from '@/app/(afterLogin)/_component/emoji/EmojiSelector';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';
import ProgressSvg from '@/app/_svg/tweet/ProgressSvg';
import usePostMutation from '@/app/(afterLogin)/_hooks/usePostMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';

interface Props {
  id: string;
  postId: number;
  session: Session;
}

export type MediaType =
  | { type: 'image'; link: string; file: File; width: number; height: number }
  | { type: 'gif'; link: string; width: number; height: number };

export default function CommentForm({ id, postId, session }: Props) {
  const { alterMessage } = useAlterModal();
  const [active, setActive] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<MediaType[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<FileRef>(null);
  const maxContent = process.env.NEXT_PUBLIC_CONTENT_MAX_LENGTH
    ? parseInt(process.env.NEXT_PUBLIC_CONTENT_MAX_LENGTH)
    : 280;

  const preventDefaultEvent = (e: FormEvent | ChangeEvent | MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const postMutation = usePostMutation();
  const queryClient = useQueryClient();
  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    preventDefaultEvent(e);

    if (content.length > maxContent) {
      alterMessage(
        `Content can be up to ${maxContent} characters long.`,
        'warning'
      );
      return;
    }

    postMutation.mutate(
      {
        queryClient,
        session,
        content,
        media: images,
        parentId: postId,
      },
      {
        onSuccess: () => {
          setContent('');
          setImages([]);
        },
        onError: () => {
          alterMessage('Upload failed. please try again.', 'error');
        },
      }
    );
  };
  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setActive(true);
    setContent(e.target.value);
  };
  const onChangeUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    preventDefaultEvent(e);
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
    preventDefaultEvent(e);
  };
  const onFocusContent = () => {
    contentRef.current?.focus();
  };

  return (
    <div style={active ? { marginTop: '-5px' } : {}}>
      {active && (
        <div className={style.replyInfoSection}>
          <div></div>
          <div className={style.replyInfo}>
            <button type="button" className={style.replyInfoButton}>
              Replying to <span>@{id}</span>
            </button>
          </div>
        </div>
      )}
      <form
        className={cx(style.postForm, active && style.active)}
        onSubmit={onSubmitForm}
      >
        <div className={style.postUserSection}>
          <div className={style.postUserImage}>
            <MyProfile width={40} height={40} />
          </div>
        </div>
        <div className={style.postInputSection}>
          <div className={style.postTextareaSection}>
            <ReactTextareaAutosize
              ref={contentRef}
              className={style.postContent}
              maxRows={10}
              minRows={1}
              value={content}
              onChange={onChangeContent}
              placeholder="Post your reply"
              spellCheck={false}
              onFocus={() => {
                setActive(true);
              }}
            />

            {!active && (
              <button className={style.actionButton} disabled={!content}>
                Reply
              </button>
            )}
          </div>
          <CommentFormPreview images={images} setImages={setImages} />
          {active && (
            <div className={style.postButtonSection}>
              <div className={style.footerButtons}>
                <FileUploader
                  className={style.funcButton}
                  ref={fileRef}
                  onChange={onChangeUpload}
                  disabled={images.length === 4}
                />
                <GifPicker
                  className={style.funcButton}
                  setState={setImages}
                  disabled={images.length === 4}
                />
                <EmojiSelector
                  className={style.funcButton}
                  setState={setContent}
                  onFocus={onFocusContent}
                />
                <button
                  type="button"
                  className={style.funcButton}
                  onClick={onClickLocation}
                  disabled
                >
                  <LocationSvg />
                </button>
              </div>
              <div className={style.replyButtonSection}>
                <ProgressSvg value={content.length} maxValue={maxContent} />
                <button
                  type="submit"
                  className={style.actionButton}
                  disabled={!content && images.length === 0}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
