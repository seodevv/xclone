'use client';

import styles from './top.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { ChangeEventHandler, useContext, useRef } from 'react';
import { getFileDataURL, IMAGE_DEFAULT_LISTS } from '@/app/_lib/common';
import PhotoButton from '@/app/_component/_button/PhotoButton';
import XMarkButton from '@/app/_component/_button/XMarkButton';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';

export default function ListsCreatorTop() {
  const {
    state: { image },
    dispatch,
  } = useContext(IListsContext);
  const fileRef = useRef<HTMLInputElement>(null);
  const lists = useListsStore((state) => state.lists);

  const settingFiles = async (file?: File) => {
    if (file) {
      const link = await getFileDataURL(file);
      dispatch({ type: 'setOrigin', payload: { file, link } });
    } else {
      dispatch({ type: 'resetImage' });
    }
  };

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    settingFiles(file);
  };

  const onClickPhoto = () => {
    fileRef.current?.click();
  };

  const onClickXmark = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    if (lists) {
      dispatch({ type: 'setDefaultImage', payload: IMAGE_DEFAULT_LISTS });
    } else {
      dispatch({ type: 'resetImage' });
    }
  };

  return (
    <div className={styles.image}>
      <div className={styles.banner}>
        <div className={styles.pad}></div>
        <div className={styles.absolute}>
          {image.link && (
            <Image
              className={styles.preview}
              src={image.banner?.link ? image.banner.link : image.link}
              alt={image.banner?.link ? image.banner.link : image.link}
              width={600}
              height={200}
            />
          )}
        </div>
        <div className={cx(styles.absolute, styles.layer)}></div>
      </div>
      <div className={styles.absolute}></div>
      <div className={cx(styles.absolute, styles.controller)}>
        <PhotoButton width={22} onClick={onClickPhoto} />
        {image.link && (
          <XMarkButton
            className={styles.xmark}
            width={22}
            onClick={onClickXmark}
          />
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={onChangeFile}
      />
    </div>
  );
}
