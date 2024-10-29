import utils from '@/app/utility.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import Text from '@/app/_component/_text/Text';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';

export default function DisplayLanguage() {
  const title = 'Display language';
  const sub =
    'Select your preferred language for headlines, buttons, and other text from X.';
  return (
    <div>
      <PageHeader title={title} noBack />
      <Text className={utils.p_basic} theme="gray" size="xs">
        {sub}
      </Text>
      <SettingsSubMenu
        type="link"
        href="/settings/language"
        title="Display language"
        sub="English"
      />
    </div>
  );
}
