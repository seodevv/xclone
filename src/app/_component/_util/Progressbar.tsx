import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface Props {
  theme?: 'primary';
  timeout?: number;
  frame?: number;
  active: boolean;
}

export interface ProgressbarRef {
  start: () => void;
  end: () => void;
}

const Progressbar = forwardRef<ProgressbarRef, Props>(
  ({ theme = 'primary', timeout = 3000, frame = 16.67, active }, ref) => {
    const [n, setN] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function start() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (n >= timeout) {
        return end();
      }

      timerRef.current = setTimeout(() => {
        setN((prev) => (prev >= timeout ? timeout : prev + frame));
        start();
      }, frame);
    }

    function end() {
      setN(0);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    useImperativeHandle(ref, () => ({
      start: () => start(),
      end: () => end(),
    }));

    useEffect(() => {
      if (active) {
        start();
      } else {
        end();
      }
    }, [active]);

    return (
      <div
        className={cx(
          utils.relative,
          utils.zIndex_s,
          utils.w_100p,
          utils.h_02_rem,
          utils.of_hide,
          active ? utils.visible : utils.invisible
        )}
      >
        <div
          className={cx(
            utils.relative,
            utils.zIndex_xs,
            utils.h_100p,
            utils.transit_width,
            theme === 'primary' && utils.bg_primary
          )}
          style={{ width: `${(n / timeout) * 100}%` }}
        ></div>
      </div>
    );
  }
);

export default Progressbar;
