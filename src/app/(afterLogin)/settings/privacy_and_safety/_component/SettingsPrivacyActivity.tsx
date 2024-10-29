import PageHeader from '@/app/(afterLogin)/_component/_page/PageHeader';
import SettingsSubMenu, {
  ISettingsSubMenu,
} from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import AudienceSvg from '@/app/_svg/_settings/AudienceSvg';
import ContentSvg from '@/app/_svg/_settings/ContentSvg';
import DiscoverabilityContactSvg from '@/app/_svg/_settings/DiscoverabilityContactSvg';
import PostSvg from '@/app/_svg/_settings/PostSvg';
import SpaceSvg from '@/app/_svg/_settings/SpaceSvg';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import MuteSvg from '@/app/_svg/post/MuteSvg';

export default function SettingsPrivacyActivity() {
  const title = 'Your X activity';
  const subMenus: ISettingsSubMenu[] = [
    {
      id: 0,
      type: 'link',
      href: '/settings/audience_and_tagging',
      svg: <AudienceSvg />,
      title: 'Audience, media and tagging',
      sub: 'Manage what information you allow other people on X to see.',
    },
    {
      id: 1,
      type: 'link',
      href: '/settings/your_tweets',
      svg: <PostSvg />,
      title: 'Your posts',
      sub: 'Manage the information associated with your posts.',
    },
    {
      id: 2,
      type: 'link',
      href: '/settings/content_you_see',
      svg: <ContentSvg />,
      title: 'Content you see',
      sub: 'Decide what you see on X based on your preferences like Topics and interests.',
    },
    {
      id: 3,
      type: 'link',
      href: '/settings/mute_and_block',
      svg: <MuteSvg />,
      title: 'Mute and block',
      sub: "Manage the accounts, words, and notifications that you've musted or blocked.",
    },
    {
      id: 4,
      type: 'link',
      href: '/settings/direct_messages',
      svg: <MessageSvg />,
      title: 'Direct Messages',
      sub: 'Manage who can message you directly.',
    },
    {
      id: 5,
      type: 'link',
      href: '/settings/spaces',
      svg: <SpaceSvg />,
      title: 'Spaces',
      sub: 'Manage who can see your Spaces listening activity.',
    },
    {
      id: 6,
      type: 'link',
      href: '/settings/contacts',
      svg: <DiscoverabilityContactSvg />,
      title: 'Discoverability and contacts',
      sub: "Control your discoverability settings and menage contacts you've imported.",
    },
  ];

  return (
    <>
      <PageHeader title={title} noBack height={48} />
      {subMenus.map((m) => (
        <SettingsSubMenu
          key={m.id}
          type={m.type}
          href={m.href}
          svg={m.svg}
          title={m.title}
          sub={m.sub}
          external={m.external}
          onClick={m.onClick}
        />
      ))}
    </>
  );
}
