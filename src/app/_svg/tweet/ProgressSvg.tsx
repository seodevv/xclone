import styles from '../_style/svg.module.css';
import { useEffect, useState } from 'react';
import cx from 'classnames';

interface Props {
  value: number;
  maxValue: number;
  type?: 'butt' | 'round';
  width?: number;
  borderWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
  className?: string;
}

export default function ProgressSvg({
  value,
  maxValue,
  type = 'butt',
  width = 45,
  borderWidth = 4,
  backgroundColor = '#2F3336',
  progressColor = '#1D9BF0',
  className,
}: Props) {
  const [progress, setProgress] = useState(0);

  const a = width / -8;
  const b = width * 1.25;
  const r = (width - 20) / 2;
  const c = width / 2;
  const d = (width - 20) * 3.14;

  const temp = progress * d;
  const isMax = temp >= d;
  const p = isMax ? 0 : d - temp;

  const stroke =
    progress >= 1 ? '#F4212F' : progress >= 0.9 ? '#FFD400' : progressColor;

  const count = maxValue - value;
  const isHidden = value - maxValue >= 100;

  useEffect(() => {
    setProgress(value / maxValue);
  }, [value, maxValue]);

  return (
    <svg
      width={width}
      height={width}
      viewBox={`${a} ${a} ${b} ${b}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        styles.progress,
        progress >= 0.9 && styles.scaleUp,
        isHidden && styles.hidden,
        className
      )}
    >
      {value > 0 && (
        <>
          <circle
            r={r}
            cx={c}
            cy={c}
            fill="transparent"
            stroke={backgroundColor}
            strokeWidth={progress >= 0.9 ? borderWidth - 1 : borderWidth}
            strokeDasharray={`${d}px`}
            strokeDashoffset="0"
          ></circle>
          <circle
            r={r}
            cx={c}
            cy={c}
            stroke={stroke}
            strokeWidth={progress >= 0.9 ? borderWidth - 1 : borderWidth}
            strokeLinecap={type}
            strokeDashoffset={`${p}px`}
            fill="transparent"
            strokeDasharray={`${d}px`}
          ></circle>

          {progress >= 0.9 && (
            <text
              x={`${
                count / 10 >= 1
                  ? 16
                  : count / 10 >= 0
                  ? 19
                  : count / 10 > -1
                  ? 16
                  : 13
              }px`}
              y="36px"
              fill={stroke}
              className={styles.progressText}
            >
              {count}
            </text>
          )}
        </>
      )}
    </svg>
  );
}
