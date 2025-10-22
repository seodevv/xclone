'use client';

import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import Text from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useRouter } from 'next/navigation';

export default function AnalyticsOthers() {
  const router = useRouter();

  const onClickDismiss = () => {
    router.back();
  };

  return (
    <div
      className={cx(
        utils.d_flexColumn,
        utils.flex_alignCenter,
        utils.flex_justiCenter,
        utils.flexGrow_1
      )}
    >
      <div className={cx(utils.ma_32, utils.w_max_400)}>
        <div>
          <Text theme="theme" size="xxxl" bold="bold">
            Views
          </Text>
          <Text text="theme">
            Times this post was seen. To learn more, visit the Help Center.
          </Text>
        </div>
        <div>
          <FlexButton text="Dismiss" large onClick={onClickDismiss} />
        </div>
      </div>
    </div>
  );
}
