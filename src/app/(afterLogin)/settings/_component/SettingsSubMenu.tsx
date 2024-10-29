'use client';

import styles from './settings.submenu.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import GreatherArrowSvg from '@/app/_svg/arrow/GreatherArrowSvg';
import RightUpArrowSvg from '@/app/_svg/arrow/RightUpArrowSvg';
import { MouseEventHandler } from 'react';

export interface ISettingsSubMenu {
  id: number;
  type: 'link' | 'button';
  href?: string;
  svg?: JSX.Element;
  title: string;
  sub?: string | JSX.Element;
  external?: boolean;
  select?: 'none';
  arrow?: 'none';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface Props {
  type: 'link' | 'button';
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  svg?: JSX.Element;
  title: string;
  sub?: string | JSX.Element;
  external?: boolean;
  select?: 'none';
  arrow?: 'none';
}
export default function SettingsSubMenu(props: Props) {
  if (props.type === 'link') {
    return (
      <Link
        className={cx(styles.link, props.select === 'none' && styles.none)}
        href={props.href as string}
        target={props.external ? '_blank' : undefined}
      >
        {props.svg && (
          <div className={styles.icon}>
            <props.svg.type {...props.svg.props} width={18.75} />
          </div>
        )}
        <div className={styles.description}>
          <Text text={props.title} size="m" />
          {typeof props.sub === 'string' && (
            <Text text={props.sub} theme="gray" size="xs" />
          )}
          {typeof props.sub === 'object' && (
            <Text theme="gray" size="xs">
              {props.sub}
            </Text>
          )}
        </div>
        {props.arrow !== 'none' && (
          <div className={styles.svg}>
            {props.external ? (
              <RightUpArrowSvg width={18.75} />
            ) : (
              <GreatherArrowSvg width={18.75} />
            )}
          </div>
        )}
      </Link>
    );
  }

  return (
    <button
      className={cx(styles.button, props.select === 'none' && styles.none)}
      onClick={props.onClick}
    >
      {props.svg && (
        <div className={styles.icon}>
          <props.svg.type {...props.svg.props} width={18.75} />
        </div>
      )}
      <div className={styles.description}>
        <Text text={props.title} size="m" />
        {typeof props.sub === 'string' && (
          <Text text={props.sub} theme="gray" size="xs" />
        )}
        {typeof props.sub === 'object' && (
          <Text theme="gray" size="xs">
            {props.sub}
          </Text>
        )}
      </div>
      {props.arrow !== 'none' && (
        <div className={styles.svg}>
          {props.external ? (
            <RightUpArrowSvg width={18.75} />
          ) : (
            <GreatherArrowSvg width={18.75} />
          )}
        </div>
      )}
    </button>
  );
}
