'use client';

import styles from './afterLogin.component.postForm.module.css';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import cx from 'classnames';
import MyProfile from '@/app/(afterLogin)/_component/profile/MyProfile';
import { splitEmoji } from '@/app/_lib/common';
import usePostMutation from '@/app/(afterLogin)/_hooks/usePostMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import useAlterModal from '@/app/_hooks/useAlterModal';
import PostFormPreview from '@/app/(afterLogin)/_component/post/form/PostFormPreview';
import ReplyInfo from '@/app/(afterLogin)/_component/post/form/ReplyInfo';
import PostFormFeature from '@/app/(afterLogin)/_component/post/form/PostFormFeatures';
import { AdvancedPost } from '@/model/Post';
import PostQuote from '@/app/(afterLogin)/_component/post/_quote/PostQuote';

interface Props {
  session: Session;
  mode?: 'post' | 'comment' | 'compose';
  parent?: {
    postId: number;
    userId: string;
  };
  repost?: AdvancedPost;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  fontSize?: number;
  lineHeight?: number;
  onSubmitEnd?: () => void;
}

export type MediaType =
  | { type: 'image'; link: string; file: File; width: number; height: number }
  | { type: 'gif'; link: string; width: number; height: number };

export default function PostForm({
  session,
  mode = 'post',
  parent,
  repost,
  placeholder = 'Post your reply',
  minRows = 1,
  maxRows = 10,
  fontSize = 20,
  lineHeight = 24,
  onSubmitEnd,
}: Props) {
  const { alterMessage } = useAlterModal();
  const [active, setActive] = useState(mode !== 'comment');
  const [content, setContent] = useState('');
  const [lastSelection, setLastSelection] = useState(0);
  const [images, setImages] = useState<MediaType[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);
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
        parent,
        repost,
      },
      {
        onSuccess: () => {},
        onError: (error, { content, media }) => {
          alterMessage('Upload failed. please try again.', 'error');
          setContent(content);
          setImages(media);
        },
      }
    );
    if (typeof onSubmitEnd === 'function') {
      onSubmitEnd();
    }
    setContent('');
    setImages([]);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setActive(true);
    setContent(e.target.value);
  };
  const onFocusContent: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.type === 'focus') {
      setActive(true);
    } else if (e.type === 'blur') {
      const prevContent = content.substring(0, e.target.selectionStart);
      setLastSelection(splitEmoji(prevContent).length);
    }
  };
  const onFocusEmoji = () => {
    const range = splitEmoji(content).splice(0, lastSelection).join('').length;
    contentRef.current?.setSelectionRange(range, range);
    contentRef.current?.focus();
  };

  return (
    <div style={active ? { marginTop: '-5px' } : {}}>
      <ReplyInfo userId={parent?.userId} active={active} />
      <form className={cx(styles.postForm)} onSubmit={onSubmitForm}>
        <div className={cx(styles.postFormFlex, active && styles.active)}>
          <div className={styles.postUserSection}>
            <MyProfile session={session} width={40} height={40} />
          </div>
          <div className={styles.postInputSection}>
            <div className={styles.postTextareaSection}>
              <ReactTextareaAutosize
                ref={contentRef}
                className={styles.postContent}
                style={{
                  height: lineHeight + lineHeight * minRows,
                  fontSize: fontSize,
                  lineHeight: `${lineHeight}px`,
                }}
                minRows={
                  (content === '' && images.length !== 0) || repost
                    ? 1
                    : minRows
                }
                maxRows={maxRows}
                value={content}
                onChange={onChangeContent}
                placeholder={placeholder}
                spellCheck={false}
                onFocus={onFocusContent}
                onBlur={onFocusContent}
              />
              {!active && (
                <button className={styles.actionButton} disabled={!content}>
                  Reply
                </button>
              )}
            </div>
            <PostFormPreview images={images} setImages={setImages} />
            {repost && (
              <PostQuote
                mode={images.length === 0 ? 'long' : 'short'}
                post={repost}
                noEvent
              />
            )}
            {active && mode !== 'compose' && (
              <PostFormFeature
                isComment={!!parent}
                images={images}
                setImages={setImages}
                content={content}
                maxContent={maxContent}
                setContent={setContent}
                lastSelection={lastSelection}
                setLastSelection={setLastSelection}
                onFocusEmoji={onFocusEmoji}
              />
            )}
          </div>
        </div>
        {mode === 'compose' && (
          <PostFormFeature
            isComment={!!parent}
            images={images}
            setImages={setImages}
            content={content}
            maxContent={maxContent}
            setContent={setContent}
            lastSelection={lastSelection}
            setLastSelection={setLastSelection}
            onFocusEmoji={onFocusEmoji}
          />
        )}
      </form>
    </div>
  );
}
