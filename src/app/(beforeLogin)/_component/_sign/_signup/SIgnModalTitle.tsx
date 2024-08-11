import styles from './beforeLogin.signup.module.css';

interface Props {
  text?: string;
  children?: React.ReactNode;
}

export default function SignModalTitle({
  text = 'Sign up for XClone ',
  children,
}: Props) {
  return (
    <div className={styles.signModalTitle}>
      <h1>{text}</h1>
      {children}
    </div>
  );
}
