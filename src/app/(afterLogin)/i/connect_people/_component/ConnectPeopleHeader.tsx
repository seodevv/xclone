import SettingsLink from '@/app/(afterLogin)/_component/Link/SettingsLink';
import styles from './connectPeople.header.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import TabLink from '@/app/(afterLogin)/_component/tab/TabLink';

interface Props {
  is_creator_only?: string;
}

export default function ConnectPeopleHeader({ is_creator_only }: Props) {
  return (
    <section>
      <PageHeader title="Connect">
        <SettingsLink href="/settings/contacts" />
      </PageHeader>
      <div className={styles.tabs}>
        <TabLink
          href="/i/connect_people"
          text="Who to follow"
          active={!is_creator_only}
        />
        <TabLink
          href="/i/connect_people?is_creator_only=true"
          text="Creators for you"
          active={!!is_creator_only}
        />
      </div>
    </section>
  );
}
