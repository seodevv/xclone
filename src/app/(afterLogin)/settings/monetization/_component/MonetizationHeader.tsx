import BackButton from '@/app/(afterLogin)/_component/buttons/BackButton';
import styles from './monetizationHeader.module.css';
import Link from 'next/link';
import HelpSvg from '@/app/_svg/_settings/HelpSvg';

export default function MonetizationHeader() {
  return (
    <div className={styles.header}>
      <BackButton />
      <div className={styles.help}>
        <Link
          className={styles.link}
          href="https://help.x.com/using-x/x-premium-faq#item2"
          target="_blank"
        >
          <HelpSvg white />
        </Link>
      </div>
    </div>
  );
}
