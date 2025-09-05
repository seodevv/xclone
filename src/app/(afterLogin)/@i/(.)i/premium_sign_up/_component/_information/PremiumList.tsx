'use client';

import styles from './i.premiumSignUp.item.module.css';
import cx from 'classnames';
import InformSvg from '@/app/_svg/input/InformSvg';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import { MouseEvent, useContext } from 'react';
import usePopUpStore from '@/app/(afterLogin)/_store/PopUpStore';
import { PremiumSignUpContext } from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';

interface List {
  type: string;
  value?: string;
  inform?: string;
}

interface Props {
  type: 'headline' | 'list';
  value: List[];
}

export default function PremiumList({ type, value }: Props) {
  const { state } = useContext(PremiumSignUpContext);
  const setPopup = usePopUpStore((state) => state.setPopup);

  const onClickInform = (e: MouseEvent<HTMLButtonElement>, inform?: string) => {
    if (!inform || !value[0].value) return;
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    const content = {
      title: value[0].value,
      description: inform,
    };
    setPopup({
      content,
      position: {
        x,
        y,
        width,
        height,
        element: e.currentTarget,
      },
    });
  };

  return (
    <>
      <div
        className={cx(
          type === 'headline' && styles.headline,
          type === 'list' && styles.list
        )}
      >
        {value.map((v, i) => (
          <div
            key={i}
            className={cx(
              styles.item,
              state.mode === 'verified' && styles.verifiedItem
            )}
          >
            {v.type === 'text' && <span>{v.value}</span>}
            {v.type === 'check' && <CheckSvg width={21.25} theme="theme" />}
            {v.inform && (
              <button
                type="button"
                className={styles.inform}
                onClick={(e) => onClickInform(e, v.inform)}
              >
                <InformSvg theme="theme" />
              </button>
            )}
          </div>
        ))}
      </div>
      <span className={styles.hr}></span>
    </>
  );
}
