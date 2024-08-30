'use client';

import styles from './beforeLogin.signup.module.css';
import utils from '@/app/utility.module.css';
import Image from 'next/image';
import cx from 'classnames';
import SignModalTitle from '@/app/(beforeLogin)/_component/_sign/_signup/SIgnModalTitle';
import PhotoButton from '@/app/(beforeLogin)/_component/_button/PhotoButton';
import DEFAULT_PROFILE from '/public/default_profile.png';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PhotoEditor from '@/app/_component/_photo/PhotoEditor';
import { getFileDataURL } from '@/app/_lib/common';
import useSignUp from '@/app/(beforeLogin)/_hooks/useSignUp';

export default function SignUpPhaseC() {
  const {
    options: { edit },
    profile: { value },
    set,
    setEdit,
  } = useSignUp();
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const title = 'Have a favorite selfie? Upload it now.';

  const onClickPhoto: MouseEventHandler<HTMLButtonElement> = () => {
    fileRef.current?.click();
    setIsUpload(true);
  };

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (!files) return;
    settingFile(files[0]);
  };

  const settingFile = useCallback(
    async (file: File) => {
      setIsUpload(false);
      if (file) {
        const dataUrl = await getFileDataURL(file);
        set({
          type: 'profile',
          payload: { value: { file, link: dataUrl }, disabled: false },
        });
        setEdit(true);
      } else {
        set({
          type: 'profile',
          payload: { value: { file: null, link: '' }, disabled: true },
        });
      }
    },
    [setIsUpload, set, setEdit]
  );

  useEffect(() => {
    const focusListener = () => {
      if (fileRef.current?.files) {
        settingFile(fileRef.current.files[0]);
      }
    };
    if (isUpload) {
      window.addEventListener('focus', focusListener);
    }
    return () => {
      if (isUpload) {
        window.removeEventListener('focus', focusListener);
      }
    };
  }, [isUpload, settingFile]);

  return (
    <div className={cx(styles.slide, edit && utils.pa_0, utils.slide_right_in)}>
      {!edit && (
        <div className={styles.content}>
          <SignModalTitle text="Pick a profile picture">
            <div className={cx(styles.rulesSub, utils.mt_8)}>{title}</div>
          </SignModalTitle>
          <div className={styles.profileSection}>
            <div className={styles.profileBox}>
              <div className={styles.profile}>
                <div className={utils.pb_100}></div>
                <div className={cx(utils.absolute, utils.t_r_b_l_0)}>
                  <Image
                    className={cx(utils.w_100p, utils.h_100p, utils.obj_cover)}
                    src={value.link ? value.link : DEFAULT_PROFILE}
                    alt="default_profile"
                    width={200}
                    height={200}
                  />
                </div>
                <div
                  className={cx(
                    utils.absolute,
                    utils.t_r_b_l_0,
                    styles.profileBg
                  )}
                ></div>
                <div
                  className={cx(
                    utils.absolute,
                    utils.t_r_b_l_0,
                    styles.profileAction
                  )}
                >
                  <PhotoButton onClick={onClickPhoto} />
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    hidden
                    onChange={onChangeFile}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {edit && (
        <PhotoEditor
          imageSrc={value.link}
          fileName={value.file?.name}
          type={value.file?.type}
          onClose={() => {
            setEdit(false);
          }}
          onComplete={(dataUrl, file) => {
            set({
              type: 'profile',
              payload: { value: { file, link: dataUrl }, disabled: false },
            });
          }}
        />
      )}
    </div>
  );
}
