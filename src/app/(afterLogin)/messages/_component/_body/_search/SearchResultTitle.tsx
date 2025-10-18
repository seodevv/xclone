import { MessageSearchTab } from '@/app/(afterLogin)/messages/_component/_body/_search/MessagesSearchBody';
import Text from '@/app/_component/_text/Text';
import { capitalCase } from '@/app/_lib/common';
import MessageSvg from '@/app/_svg/navbar/MessageSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import utils from '@/app/utility.module.css';
import cx from 'classnames';

export default function SearchResultTitle({
  type,
}: {
  type: MessageSearchTab;
}) {
  const svgClass = cx(utils.mtb_8, utils.mr_12);
  return (
    <div
      className={cx(
        utils.ptb_4,
        utils.pl_16,
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.bd_b_1_solid_gray
      )}
    >
      {type === 'people' && (
        <ProfileSvg className={svgClass} width={18.75} theme="theme" active />
      )}
      {type === 'messages' && (
        <MessageSvg className={svgClass} width={18.75} theme="theme" active />
      )}
      <Text size="xl" bold="bold">
        {capitalCase(type)}
      </Text>
    </div>
  );
}
