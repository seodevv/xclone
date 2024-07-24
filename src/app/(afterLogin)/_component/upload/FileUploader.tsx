'use client';

import FileSvg from '@/app/_svg/tweet/FileSvg';
import {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  useImperativeHandle,
  useRef,
} from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export interface FileRef {
  reset: () => void;
}

const FileUploader = forwardRef<FileRef, Props>(
  ({ className, onChange, style, disabled }, ref) => {
    const imageRef = useRef<HTMLInputElement>(null);

    const onClickUpload: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (imageRef.current) imageRef.current.click();
    };

    useImperativeHandle(
      ref,
      () => ({
        reset() {
          if (imageRef.current) imageRef.current.value = '';
        },
      }),
      []
    );

    return (
      <div>
        <input
          ref={imageRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={onChange}
          multiple
          hidden
        />
        <button
          type="button"
          className={className}
          style={style}
          onClick={onClickUpload}
          disabled={disabled}
        >
          <FileSvg />
        </button>
      </div>
    );
  }
);

export default FileUploader;
