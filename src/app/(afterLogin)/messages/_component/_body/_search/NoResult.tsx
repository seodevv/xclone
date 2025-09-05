'use client';

import { MessagesSearchContext } from '@/app/(afterLogin)/messages/_component/_body/_search/_provider/MessagesSearchProvider';
import Text from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';

interface Props {}

export default function NoResult({}: Props) {
  const { input } = useContext(MessagesSearchContext);

  return (
    <div
      className={cx(
        utils.mtb_32,
        utils.mrl_auto,
        utils.prl_32,
        utils.d_flexColumn,
        utils.flex_alignCenter,
        utils.w_100p,
        utils.w_max_400
      )}
    >
      <Text
        className={utils.mb_8}
        theme="theme"
        size="xxxxl"
        bold="boldest"
        whiteSpace="nowrap"
      >
        No results for "{input}"
      </Text>
      <Text className={utils.mb_28} theme="gray" size="s" bold="normal">
        The term you entered did not bring up any results
      </Text>
      <Link
        className={cx(
          utils.prl_32,
          utils.d_flexColumn,
          utils.alignself_start,
          utils.w_min_52,
          utils.h_min_52,
          utils.bg_primary,
          utils.hover_bg_primary,
          utils.active_bg_primary,
          utils.bd_1_solid_trans,
          utils.br_9999,
          utils.transit_basic
        )}
        href={'/messages/compose'}
      >
        <Text
          className={cx(
            utils.flex_alignCenter,
            utils.flex_justiCenter,
            utils.flexGrow_1
          )}
          theme="theme"
          size="m"
          bold="bold"
          display="flex"
        >
          Start new message
        </Text>
      </Link>
    </div>
  );
}
