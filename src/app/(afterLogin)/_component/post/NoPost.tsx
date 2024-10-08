import styles from './noPost.module.css';

interface Props {
  title: string;
  message?: string;
  children?: React.ReactNode;
}

export default function NoPost({ title, message, children }: Props) {
  return (
    <div className={styles.noPost}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.message}>{message && <span>{message}</span>}</div>
      {children}
    </div>
  );
}
