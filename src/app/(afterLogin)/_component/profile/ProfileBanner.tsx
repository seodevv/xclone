'use client';

import styles from './profile.banner.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import PhotoButton from '@/app/_component/_button/PhotoButton';
import XMarkButton from '@/app/_component/_button/XMarkButton';
import { ChangeEventHandler, useRef } from 'react';

interface Props {
  mode?: 'edit';
  imageSrc?: string;
  onLoad?: (file?: File) => void;
  onClear?: () => void;
}

export default function ProfileBanner({
  mode,
  imageSrc,
  onLoad,
  onClear,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickPhotoBtn = () => {
    if (mode !== 'edit') return;
    fileRef.current?.click();
  };

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (typeof onLoad === 'function') {
      onLoad(file);
    }
  };

  const onClickXMark = () => {
    if (mode !== 'edit') return;
    if (typeof onClear === 'function') {
      onClear();
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.relative}>
          <div className={styles.pad}></div>
          <div className={styles.absolute}>
            {imageSrc && (
              <Image
                className={styles.image}
                src={generateImagePath(imageSrc)}
                alt={imageSrc}
                width={600}
                height={200}
              />
            )}
          </div>
          {mode === 'edit' && (
            <div className={cx(styles.absolute, styles.controller)}>
              <div className={styles.buttons}>
                <PhotoButton width={22} onClick={onClickPhotoBtn} />
                {imageSrc && (
                  <XMarkButton
                    className={styles.second}
                    width={22}
                    onClick={onClickXMark}
                  />
                )}
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={onChangeInput}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
