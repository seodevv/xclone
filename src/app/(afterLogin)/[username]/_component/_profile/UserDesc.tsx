import styles from './userProfile.module.css';

interface Props {
  desc?: string;
}

export default function UserDesc({ desc }: Props) {
  if (!desc) return null;

  const split = desc.split(/\r\n|\r|\n/);

  return (
    <div className={styles.description}>
      {split.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}
