import { MouseEventHandler } from 'react';
import styles from './contextMenu.module.css';
import Link from 'next/link';

interface Props {
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
  if (props.type === 'link') {
    return (
      <Link
        className={styles.menu}
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

  const onClickDiv: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  return (
    <div className={styles.menu} onClick={onClickDiv}>
      <div className={styles.icon}>{props.svg}</div>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}
