'use client';

import styles from './i.premiumSignUp.item.module.css';
import cx from 'classnames';
import InformSvg from '@/app/_svg/input/InformSvg';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import { MouseEvent } from 'react';
import usePopUpStore from '@/app/(afterLogin)/_store/PopUpStore';

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
          <div key={i} className={styles.item}>
            {v.type === 'text' && <span>{v.value}</span>}
            {v.type === 'check' && <CheckSvg width={21.25} white />}
            {v.inform && (
              <button
                type="button"
                className={styles.inform}
                onClick={(e) => onClickInform(e, v.inform)}
              >
                <InformSvg />
              </button>
            )}
          </div>
        ))}
      </div>
      <span className={styles.hr}></span>
    </>
  );
}
