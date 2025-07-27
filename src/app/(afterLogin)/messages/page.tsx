import styles from './messages.page.module.css';
import NoMessages from '@/app/(afterLogin)/messages/_component/NoMessages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messages / XClone',
};

export default function MessagesPage() {
  return (
    <div className={styles.container}>
      <NoMessages
        title="Select a message"
        sub="Choose from your existing conversations, start a new one, or just keep swimming."
        linkText="New message"
      />
    </div>
  );
}
