'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import PhotoEditor from '@/app/_component/_photo/PhotoEditor';
import { useContext } from 'react';

export default function ListsThumbnailEditor() {
  const { state, dispatch } = useContext(IListsContext);

  const onClose = () => {
    if (!state.image.origin) return;
    dispatch({ type: 'setOrigin', payload: { ...state.image.origin } });
  };

  const onComplete = (link: string, file: File) => {
    dispatch({ type: 'setThumbnail', payload: { link, file } });
  };

  if (!state.image.banner) return;

  return (
    <div style={{ flexGrow: 1 }}>
      <div
        className={cx(utils.fixed, utils.t_r_b_l_0)}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <PhotoEditor
        imageSrc={state.image.banner.link}
        fileName={`${state.image.banner.file.name.replace(
          'banner_',
          'thumbnail_'
        )}`}
        type={state.image.banner.file.type}
        title="Crop Thumbnail"
        aspect={1 / 1}
        cropShape="rect"
        objectFit="vertical-cover"
        onClose={onClose}
        onComplete={onComplete}
      />
    </div>
  );
}
