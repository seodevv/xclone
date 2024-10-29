import utils from '@/app/utility.module.css';
import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import Text from '@/app/_component/_text/Text';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function AdditionalLanguages() {
  const title = 'Select additional languages';
  const sub =
    'Select additional languages for the content you want to see on X.';
  return (
    <div>
      <DivideLine />
      <PageHeader title={title} noBack />
      <Text className={utils.p_basic} theme="gray" size="xs">
        {sub}
      </Text>
      <SettingsSubMenu
        type="link"
        href="/i/flow/language_selector"
        title="Additional languages you speak"
      />
    </div>
  );
}
