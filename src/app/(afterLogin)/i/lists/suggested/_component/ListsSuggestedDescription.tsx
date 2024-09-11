import styles from './listsSuggested.description.module.css';
import Image from 'next/image';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import suggested_image from '/public/lists_suggested.png';
import created_image from '/public/lists_create.png';

interface Props {
  type: 'info' | 'create';
}

export default function ListsSuggestedDescription({ type }: Props) {
  const title = type === 'info' ? 'Choose your Lists' : 'Create your own List';
  const sub =
    type === 'info'
      ? "When you follow a List, you'll be able to quickly keep up with the experts on what you care about most."
      : 'You can create your own Lists by adding the people who are already talking about what you want to keep up with most.';

  return (
    <div className={styles.description}>
      <div className={styles.relative}>
        <div className={styles.pad}></div>
        <div className={styles.absolute}>
          <Image
            className={styles.image}
            src={type === 'info' ? suggested_image : created_image}
            alt={type}
            width={600}
            height={200}
          />
        </div>
      </div>
      <div className={styles.paddingBox}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.sub}>
          <span>{sub}</span>
        </div>
        {type === 'create' && (
          <div className={styles.started}>
            <TextLink
              text="Get Started"
              href="/i/lists/create"
              theme="white"
              size="large"
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
}
