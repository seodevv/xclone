'use client';

import styles from './subMenu.module.css';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  MouseEventHandler,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

interface Props {
  position?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export default function SubMenuWrapper({
  position = 'center',
  children,
}: Props) {
  const { width: viewWidth, height: viewHeight } = useViewport();
  const {
    menu: {
      position: { x, y, width, height, target },
    },
    dispatchMenu,
  } = useContext(SubMenuContext);
  const [client, setClient] = useState({ width: 0, height: 0 });
  const [over, setOver] = useState({ x: false, y: false });
  const menuRef = useRef<HTMLDivElement>(null);

  let minusX = client.width - width;
  switch (position) {
    case 'center':
      minusX = minusX / 2;
      break;
    case 'right':
      minusX = 0;
      break;
  }

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      dispatchMenu({ type: 'reset' });
    }
  };

  useLayoutEffect(() => {
    if (menuRef.current) {
      const { clientWidth, clientHeight } = menuRef.current;
      setClient({ width: clientWidth, height: clientHeight });
    }
  }, [setClient]);

  useLayoutEffect(() => {
    if (target && client.height !== 0) {
      const { x, y, width, height } = target.getBoundingClientRect();
      const overHeight = viewHeight < y + client.height;
      setOver((prev) => ({ ...prev, y: overHeight ? true : false }));
      dispatchMenu({
        type: 'setPosition',
        payload: {
          x,
          y: overHeight
            ? y + window.scrollY - client.height + width
            : y + window.scrollY,
          width,
          height,
        },
      });
    }
  }, [viewWidth, viewHeight, dispatchMenu, target, client.height]);

  return (
    <div className={styles.background}>
      <div
        className={cx(utils.fixed, utils.t_r_b_l_0)}
        onClick={onClickOutSide}
      ></div>
      <div className={utils.relative}>
        <div
          className={cx(
            styles.context_menu,
            utils.absolute,
            over.y ? utils.fadeIn : utils.maxHeight
          )}
          style={{
            top: y,
            left: x - minusX,
          }}
        >
          <div className={utils.relative}>
            <div ref={menuRef}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
