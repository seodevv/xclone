import styles from './messages.page.module.css';
import cx from 'classnames';
import NoMessages from '@/app/(afterLogin)/messages/_component/NoMessages';

export default function MessagesPage() {
  return (
    <div className={cx(styles.container)}>
      <NoMessages
        title="Select a message"
        sub="Choose from your existing conversations, start a new one, or just keep swimming."
        linkText="New message"
      />
    </div>
  );
}
