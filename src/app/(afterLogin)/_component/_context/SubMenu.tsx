import { MouseEvent, MouseEventHandler } from 'react';
import styles from './contextMenu.module.css';
import cx from 'classnames';
import Link from 'next/link';

interface Props {
  theme?: 'default' | 'red';
  svg?: React.ReactNode;
  title?: string;
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
        <span className={styles.title}>{props.title}</span>
      </Link>
    );
  }

  return (
    <div
      className={cx(styles.menu, props.theme === 'red' && styles.red)}
      onClick={onClickElement}
    >
      <div className={styles.icon}>{props.svg}</div>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}
