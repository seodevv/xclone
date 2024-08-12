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

interface Props {
  session: Session;
  parent?: {
    postId: number;
    userId: string;
  };
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
  parent,
  placeholder = 'Post your reply',
  minRows = 1,
  maxRows = 10,
  fontSize = 20,
  lineHeight = 24,
  onSubmitEnd,
}: Props) {
  const { alterMessage } = useAlterModal();
  const [active, setActive] = useState(!parent);
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
        parent: parent,
      },
      {
        onSuccess: () => {
          if (typeof onSubmitEnd === 'function') {
            onSubmitEnd();
          }
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
                minRows={minRows}
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
            {active && (
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
      </form>
    </div>
  );
}
