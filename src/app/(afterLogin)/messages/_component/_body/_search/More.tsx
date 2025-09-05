import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

interface MoreProps {
  callback?: () => void;
}
export default function More({ callback }: MoreProps) {
  const onClickMore: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (typeof callback === 'function') {
      callback();
    }
  };
  return (
    <div
      className={cx(
        utils.ptb_12,
        utils.prl_16,
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.flex_justiBetween,
        utils.bd_t_1_solid_gray,
        utils.bd_b_1_solid_gray
      )}
    >
      <button
        className={cx(
          utils.bg_trans,
          utils.bd_none,
          utils.cl_primary,
          utils.fs_m,
          utils.hover_underline,
          utils.cursor_point
        )}
        onClick={onClickMore}
      >
        See more
      </button>
    </div>
  );
}
