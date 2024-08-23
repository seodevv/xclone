import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import styles from './i.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';

interface Props {
  children?: React.ReactNode;
}

export default function IBackground({ children }: Props) {
  return (
    <main className={cx(styles.background, utils.fadeIn)}>
      <HtmlOverflowHidden />
      <div className={styles.modal}>{children}</div>
    </main>
  );
}
