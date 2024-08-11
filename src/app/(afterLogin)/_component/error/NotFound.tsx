'use client';

import styles from './error.module.css';
import { MouseEventHandler, useEffect } from 'react';
import TextLink from '../Link/TextLink';
import TextButton from '../buttons/TextButton';
import useAlterModal from '@/app/_hooks/useAlterModal';

interface AlterMessage {
  type?: string;
  alterMessage?: string;
}
interface Button extends AlterMessage {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
interface Link extends AlterMessage {
  href: string;
}
type Props = Button | Link;

export default function NotFound(props: Props) {
  const type = props.type || 'page';

  const { alterMessage } = useAlterModal();
  const message = `Hmm...this ${type} doesn’t exist. Try searching for something else.`;
  const isButton = (prop: Props): prop is Button => {
    return Object.hasOwn(prop, 'onClick');
  };

  useEffect(() => {
    alterMessage(
      props.alterMessage ? props.alterMessage : message,
      'error',
      3000
    );
  }, []);

  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundInner}>
        <div className={styles.message}>
          <span>{message}</span>
        </div>
        {isButton(props) ? (
          <TextButton text="search" onClick={props.onClick} />
        ) : (
          <TextLink text="search" href={props.href} />
        )}
      </div>
    </section>
  );
}
