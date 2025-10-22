'use client';

import stlyes from './analytics.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import ActionButtons from '@/app/(afterLogin)/_component/post/body/ActionButtons';
import { usePostViewQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/usePostViewQuery';
import Text from '@/app/_component/_text/Text';
import InformSvg from '@/app/_svg/input/InformSvg';
import { capitalCase } from '@/app/_lib/common';
import { MouseEventHandler } from 'react';
import usePopUpStore from '@/app/(afterLogin)/_store/PopUpStore';
import { PostViews } from '@/model/Post';

type View = {
  title: Exclude<keyof PostViews, 'postid'>;
  inform: {
    title?: string;
    description: string;
  };
  count: number;
};

interface Props {
  params: { username: string; id: string };
}

export default function AnalyticsBody({ params }: Props) {
  const { data: post } = useSinglePostQuery(params);
  const { data: views } = usePostViewQuery(params.id);

  const main: View = {
    title: 'impressions',
    inform: {
      description: 'Times this post was seen on X',
    },
    count: views.data['impressions'],
  };

  const sub: View[] = [
    {
      title: 'engagements',
      inform: {
        description:
          'Total number of times a user has interacted with a post. This includes all clicks anywhere on the post (including hashtags, links, avatar, username, and post expansion), reposts, replies, follows, and likes.',
      },
      count: views.data['engagements'],
    },
    {
      title: 'detailexpands',
      inform: {
        title: 'detail expands',
        description:
          'Total number of times a user has interacted with a post. This includes all clicks anywhere on the post (including hashtags, links, avatar, username, and post expansion), reposts, replies, follows, and likes.',
      },
      count: views.data['engagements'],
    },
    {
      title: 'profilevisit',
      inform: {
        title: 'profile visits',
        description: 'Number of profile views from this post',
      },
      count: views.data['engagements'],
    },
  ];

  return (
    <div className={stlyes.container}>
      <div className={cx(utils.ma_16, utils.mb_12)}>
        <div className={cx(stlyes.post, stlyes.border)}>
          <Post post={post.data} mode="analytics" noReact />
        </div>
      </div>
      <div className={cx(utils.mr_16, utils.ml_16, utils.flex_1)}>
        <div className={cx(stlyes.reaction, stlyes.border)}>
          <ActionButtons mode="analytics" post={post.data} />
        </div>
        <div className={cx(stlyes.views)}>
          <div className={cx(utils.d_flexColumn, utils.flex_alignStart)}>
            <AnalyticsView
              type="big"
              title={main.title}
              inform={main.inform}
              count={main.count}
            />
          </div>
          <div className={cx(stlyes.sub)}>
            {sub.map((v) => (
              <AnalyticsView
                key={v.title}
                title={v.title}
                inform={v.inform}
                count={v.count}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView({
  type = 'normal',
  title,
  inform,
  count,
}: {
  type?: 'big' | 'normal';
  title: View['title'];
  inform: View['inform'];
  count: View['count'];
}) {
  const setPopup = usePopUpStore((state) => state.setPopup);

  const onClickInform: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    setPopup({
      content: {
        title: capitalCase(inform.title || title),
        description: inform.description,
      },
      position: {
        x,
        y,
        width,
        height,
        element: e.currentTarget,
      },
    });
  };

  return (
    <div className={cx(utils.d_flexColumn)}>
      <Text theme="gray" size="xs" bold="bold">
        <span className={utils.vertical_middle}>
          {capitalCase(inform.title || title)}
        </span>
        <button
          className={cx(
            utils.ml_4,
            utils.d_flexInline,
            utils.alignself_end,
            utils.bg_trans,
            utils.bd_none,
            utils.vertical_middle,
            utils.cursor_point
          )}
          onClick={onClickInform}
        >
          <InformSvg width={13.75} />
        </button>
      </Text>
      <Text
        className={utils.mt_4}
        theme="theme"
        size={type === 'big' ? 'xxxxl' : 'xl'}
        bold="bold"
      >
        {count}
      </Text>
    </div>
  );
}
