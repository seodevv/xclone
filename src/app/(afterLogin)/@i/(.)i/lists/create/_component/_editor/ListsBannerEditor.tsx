'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import PhotoEditor from '@/app/_component/_photo/PhotoEditor';
import { useContext } from 'react';

export default function ListsBannerEditor() {
  const { state, dispatch } = useContext(IListsContext);

  const onClose = () => {
    dispatch({ type: 'setPhase', payload: 'create' });
  };

  const onComplete = (link: string, file: File) => {
    dispatch({ type: 'setBanner', payload: { link, file } });
  };

  if (!state.image.origin) return;

  return (
    <div style={{ flexGrow: 1 }}>
      <div
        className={cx(utils.fixed, utils.t_r_b_l_0)}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <PhotoEditor
        imageSrc={state.image.origin.link}
        fileName={`banner_${state.image.origin.file.name}`}
        type={state.image.origin.file.type}
        title="Crop Image"
        aspect={3 / 1}
        cropShape="rect"
        onClose={onClose}
        onComplete={onComplete}
      />
    </div>
  );
}
