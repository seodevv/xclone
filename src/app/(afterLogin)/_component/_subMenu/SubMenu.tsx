import styles from './subMenu.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';
import Link from 'next/link';

interface Props {
  theme?: 'default' | 'red';
  svg?: React.ReactNode;
  title?: string;
  sub?: string;
  onClick?: () => void;
}
interface A extends Props {
  type: 'link';
  href: string;
  scroll?: boolean;
}
interface B extends Props {
  type: 'div';
}

export default function SubMenu(props: A | B) {
  const onClickElement: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  if (props.type === 'link') {
    return (
      <Link
        className={cx(styles.menu, props.theme === 'red' && styles.red)}
        href={props.href}
        scroll={props.scroll}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof props.onClick === 'function') {
            props.onClick();
          }
        }}
      >
        <div className={styles.icon}>{props.svg}</div>
        <div className={styles.desc}>
          <span className={styles.title}>{props.title}</span>
          {props.sub && <span className={styles.sub}>{props.sub}</span>}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={cx(styles.menu, props.theme === 'red' && styles.red)}
      onClick={onClickElement}
    >
      <div className={styles.icon}>{props.svg}</div>
      <div className={styles.desc}>
        <div className={styles.title}>
          <span>{props.title}</span>
        </div>
        {props.sub && (
          <div className={styles.sub}>
            <span>{props.sub}</span>
          </div>
        )}
      </div>
    </div>
  );
}
