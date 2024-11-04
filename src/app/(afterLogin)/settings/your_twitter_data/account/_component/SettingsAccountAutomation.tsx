'use client';

import styles from './settingsAccount.automation.module.css';
import utils from '@/app/utility.module.css';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import XLogoHeader from '@/app/(afterLogin)/@i/(.)i/_component/XLogoHeader';
import Text from '@/app/_component/_text/Text';
import Image, { StaticImageData } from 'next/image';
import firstImage from '/public/automation_1.png';
import secondImage from '/public/automation_2.png';
import Link from 'next/link';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { useRouter } from 'next/navigation';
import OrderList from '@/app/(afterLogin)/_component/_list/OrderList';

interface Props {
  active: boolean;
  unActive: () => void;
}

export default function SettingsAccountAutomation({ active, unActive }: Props) {
  const router = useRouter();

  const onClose = () => {
    unActive();
  };

  const onGotit = () => {
    router.push('/settings/account/automation');
  };

  if (!active) return null;

  return (
    <IBackground prevPath="" onClick={onClose}>
      <IHeader onClick={onClose} noBack>
        <XLogoHeader width={28} fill="rgb(29, 155, 240)" />
      </IHeader>
      <div className={styles.container}>
        <div className={styles.clip}>
          <div className={styles.clipInner}>
            <Text size="xxxxl" bold="bold">
              Automated Account Labels
            </Text>
          </div>
        </div>
        <div className={styles.column}>
          <Article
            title="What’s an automated account?"
            sub="Automated accounts are programmed to perform certain actions
              automatically through the X API. Like posting a region’s weather
              conditions, for example. They’re created and managed by other
              people on X."
          />
          <ImageBox src={firstImage} alt="first" />
          <Article sub="Labels let the world know who’s managing the automated account. Once an automated account owner has connected their managing account, a label will appear on the automated account profile and posts." />
          <ImageBox src={secondImage} alt="second" />
          <Article
            title="Do I need to label my automated accounts?"
            sub={
              <span>
                Yes, all automated accounts need to be labeled. This is required
                under our&nbsp;
                <Link
                  className={styles.link}
                  href="https://help.x.com/ko/rules-and-policies/x-automation"
                  target="_blank"
                >
                  new rules.
                </Link>
              </span>
            }
          />
          <Article title="How do I label my automated account?" />
          <OrderList
            data={[
              {
                title: 'Create a managing account',
                sub: 'A managing account is the human-run account responsible for the automated account.',
              },
              {
                title: 'Connect your managing and automated account',
                sub: 'Connect your accounts from the Automation page in your settings.',
              },
              {
                title: 'Your account is labeled!',
                sub: 'Once the accounts are connected, the automated account will have a label.',
              },
            ]}
          />
          <div className={styles.FAQ}>
            <Text theme="gray">
              Learn more on the&nbsp;
              <Link
                className={styles.link}
                href="https://help.x.com/ko/using-x/automated-account-labels"
                target="_blank"
              >
                automated account label FAQ
              </Link>
              &nbsp; page.
            </Text>
          </div>
          <div className={styles.gotit}>
            <FlexButton
              theme="secondary"
              text="Got it"
              style={{ margin: 0 }}
              large
              onClick={onGotit}
            />
          </div>
        </div>
      </div>
    </IBackground>
  );
}

function Article({
  title,
  sub,
}: {
  title?: string;
  sub?: string | JSX.Element;
}) {
  return (
    <div className={styles.article}>
      {title && (
        <Text className={utils.pb_8} size="xxl" bold="bold">
          {title}
        </Text>
      )}
      {sub && <Text theme="gray">{sub}</Text>}
    </div>
  );
}

function ImageBox({
  src,
  alt,
  width = 327,
  height = 249,
}: {
  src: StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={styles.imageBox}>
      <div className={styles.image}>
        <Image src={src} alt={alt} />
      </div>
    </div>
  );
}
