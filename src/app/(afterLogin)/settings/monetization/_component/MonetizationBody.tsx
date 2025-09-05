'use client';

import Link from 'next/link';
import styles from './monetizationBody.module.css';
import Text from '@/app/_component/_text/Text';
import Image, { StaticImageData } from 'next/image';
import GreatherArrowSvg from '@/app/_svg/arrow/GreatherArrowSvg';
import Monetization_1 from '/public/monetization_1.png';
import Monetization_2 from '/public/monetization_2.png';
import Monetization_3 from '/public/monetization_3.png';
import Monetization_4 from '/public/monetization_4.png';
import MonetizationPopup from '@/app/(afterLogin)/settings/monetization/_component/MonetizationPopup';
import { MouseEvent, useState } from 'react';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';

export default function MonetizationBody() {
  const viewport = useViewport();
  const [pop, setPop] = useState<{
    flag: boolean;
    position: { x: number; y: number };
    options: { text: string; check: boolean }[];
  }>({
    flag: false,
    position: { x: 0, y: 0 },
    options: [],
  });
  const steps: {
    title: string;
    sub: string;
    imageSrc: StaticImageData;
    more?: { text: string; options: { text: string; check: boolean }[] };
  }[] = [
    {
      title: 'Get paid to post',
      sub: 'Earn from sharing high quality content. The more you engage users on X, the more you earn.',
      imageSrc: Monetization_1,
      more: {
        text: 'Creator revenue sharing eligibility',
        options: [
          {
            text: 'Get Verified by subscribing to Premium',
            check: false,
          },
          {
            text: 'Have at least 5M impressions on your posts within the last 3 months',
            check: false,
          },
          {
            text: '500 followers',
            check: false,
          },
        ],
      },
    },
    {
      title: 'Build a fanbase',
      sub: 'Offer exclusive content to your biggest supporters and earn recurring income.',
      imageSrc: Monetization_2,
      more: {
        text: 'Subscriptions eligibility',
        options: [
          { text: 'Get Verified by subscribing to Premium', check: false },
          { text: '500 followers', check: false },
          { text: 'Active in the past 30 days', check: true },
          { text: 'Be at least 18 years old', check: true },
        ],
      },
    },
    {
      title: 'Make better content with Premium tools',
      sub: 'Unlock longer videos and posts, Media Studio, Analytics, and get priority support.',
      imageSrc: Monetization_3,
    },
    {
      title: 'More reach = more earnings',
      sub: 'Benefit from a Reply Boost, giving you the extra visibility to grow faster.',
      imageSrc: Monetization_4,
    },
  ];

  const resetPop = () => {
    setPop({ flag: false, position: { x: 0, y: 0 }, options: [] });
  };

  const onClickPop = (
    e: MouseEvent<HTMLDivElement>,
    options: { text: string; check: boolean }[]
  ) => {
    e.stopPropagation();
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setPop({
      flag: true,
      position: { x: x + width / 2, y: y + height + 10 },
      options,
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <Text
            className={styles.title}
            size={viewport.width > 1020 ? 'fs_34' : 'xxxxl'}
            bold="bold"
            align={viewport.width > 1020 ? 'center' : 'left'}
          >
            Make money on X
          </Text>
          <Text
            className={styles.sub}
            theme="gray"
            size={viewport.width > 1020 ? 'xl' : 'l'}
            align={viewport.width > 1020 ? 'center' : 'left'}
          >
            The first step to monetization is getting Verified with X Premium.
          </Text>
          <div className={styles.getPremium}>
            <Link
              className={styles.hyper}
              href="/i/premium_sign_up?type=verified"
              scroll={false}
            >
              <Text
                className={styles.t}
                theme="reverse"
                bold="bold"
                size="l"
                whiteSpace="nowrap"
              >
                Become a Premium Creator
              </Text>
            </Link>
          </div>
        </div>
        <div className={styles.steps}>
          {steps.map((v, i) => (
            <div key={i} className={styles.item}>
              <Text
                className={styles.title}
                size={viewport.width > 1020 ? 'xxl' : 'xl'}
                bold={viewport.width > 1020 ? 'normal' : 'bold'}
              >
                {v.title}
              </Text>
              <Text
                className={styles.inform}
                theme="gray"
                size={viewport.width > 1020 ? 'l' : 'm'}
              >
                {v.sub}
              </Text>
              <div className={styles.desc}>
                <div className={styles.imageBox}>
                  <div className={styles.pad}></div>
                  <div className={styles.absolute}>
                    <Image
                      className={styles.image}
                      src={v.imageSrc}
                      alt="Monetization"
                    />
                  </div>
                </div>
                {v.more && (
                  <div
                    className={styles.more}
                    onClick={(e) => {
                      if (v.more?.options) {
                        onClickPop(e, v.more?.options);
                      }
                    }}
                  >
                    <Text>{v.more.text}</Text>
                    <GreatherArrowSvg />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Text className={styles.footer} theme="gray" align="center">
          Learn more about our monetization programs and policies&nbsp;
          <Link
            className={styles.link}
            href="https://help.x.com/using-x/x-premium-faq#item2"
            target="_blank"
          >
            here
          </Link>
          .
        </Text>
      </div>
      {pop.flag && (
        <MonetizationPopup
          position={pop.position}
          options={pop.options}
          onClose={resetPop}
        />
      )}
    </div>
  );
}
