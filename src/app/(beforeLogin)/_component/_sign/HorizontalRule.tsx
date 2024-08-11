import styles from './beforeLogin.hr.module.css';

interface Props {
  text?: string;
}

export default function HorizontalRule({ text = 'OR' }: Props) {
  return (
    <div className={styles.horizontalRule}>
      <div className={styles.line}>
        <div></div>
      </div>
      <div className={styles.text}>
        <span>{text}</span>
      </div>
      <div className={styles.line}>
        <div></div>
      </div>
    </div>
  );
}
