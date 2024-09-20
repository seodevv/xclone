'use client';

import styles from './profile.image.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import PhotoButton from '@/app/_component/_button/PhotoButton';
import { ChangeEventHandler, useRef } from 'react';

interface Props {
  mode?: 'edit';
  imageSrc?: string;
  onLoad?: (file?: File) => void;
}

export default function ProfileImage({ mode, imageSrc, onLoad }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickPhotoButton = () => {
    if (mode !== 'edit') return;
    fileRef.current?.click();
  };

  const onClickChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (typeof onLoad === 'function') {
      onLoad(file);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.inner}>
        <div className={styles.imageBox}>
          <div className={styles.pad}></div>
          {imageSrc && (
            <div className={styles.absolute}>
              <Image
                className={styles.image}
                src={generateImagePath(imageSrc)}
                alt={imageSrc}
                width={125}
                height={125}
              />
            </div>
          )}
          {mode === 'edit' && (
            <>
              <div className={cx(styles.absolute, styles.darkly)}></div>
              <div className={cx(styles.absolute, styles.buttons)}>
                <PhotoButton width={22} onClick={onClickPhotoButton} />
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={onClickChangeInput}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
