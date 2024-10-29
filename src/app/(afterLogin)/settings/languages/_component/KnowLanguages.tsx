import utils from '@/app/utility.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import Text from '@/app/_component/_text/Text';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function KnowLanguages() {
  const title = 'Languages you may know';
  const sub =
    'Manage the languages X inferred based on your activity, such as the accounts you follow and the posts you engage with.';
  return (
    <div>
      <DivideLine />
      <PageHeader title={title} noBack />
      <Text className={utils.p_basic} theme="gray" size="xs">
        {sub}
      </Text>
      <SettingsSubMenu
        type="link"
        href="/settings/your_twitter_data/language"
        title="Languages you may know"
      />
    </div>
  );
}
