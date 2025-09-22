import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { RoomOwn } from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import { AdvancedMessages } from '@/model/Message';
import Text from '@/app/_component/_text/Text';
import ReplySvg from '@/app/_svg/post/ReplySvg';
import ImageContainer from '@/app/_component/_util/ImageContainer';

interface Props {
  Parent: AdvancedMessages['Parent'] | null;
  own: RoomOwn;
}

export default function RoomMessageParent({ Parent, own }: Props) {
  if (!Parent) return null;

  return (
    <div
      className={cx(utils.mt_12, utils.d_flexColumn, utils.w_100p)}
      style={{ marginBottom: '-28px' }}
    >
      <div
        className={cx(
          utils.pb_8,
          utils.d_flexRow,
          utils.flex_alignBase,
          utils.gap_4,
          own === 'thine' ? utils.alignself_start : utils.alignself_end
        )}
      >
        <ReplySvg
          width={10}
          direction={own === 'thine' ? 'right' : 'left'}
          full
        />
        <Text text="Replying to" theme="gray" size="fs_11" />
      </div>
      {Parent.content === '' && Parent.Media && (
        <div className={cx(utils.w_100p, utils.d_flexColumn)}>
          <div
            className={cx(
              utils.mb_32,
              utils.relative,
              utils.d_flexRow,
              utils.flexGrow_1,
              own === 'thine' ? utils.alignself_start : utils.alignself_end,
              utils.w_80,
              utils.br_12,
              utils.of_hide
            )}
          >
            <ImageContainer
              image={{
                src: Parent.Media.url,
                alt: Parent.Media.url,
                width: Parent.Media.width,
                height: Parent.Media.height,
              }}
            />
          </div>
        </div>
      )}
      {Parent.content !== '' && (
        <div className={cx(utils.w_100p, utils.d_flexColumn)}>
          <div
            className={cx(
              utils.mt_2,
              utils.pt_12,
              utils.pb_32,
              utils.prl_16,
              utils.d_flexRow,
              own === 'thine' ? utils.alignself_start : utils.alignself_end,
              utils.gap_12,
              utils.w_max_100p,
              utils.bg_gray,
              utils.br_24
            )}
          >
            <Text text={Parent.content} theme="gray" size="xs" />
          </div>
        </div>
      )}
    </div>
  );
}
