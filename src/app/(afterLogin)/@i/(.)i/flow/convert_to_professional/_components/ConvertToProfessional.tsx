'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import ImageSrc from '/public/convert_to_professional.png';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import useAlterModal from '@/app/_hooks/useAlterModal';
import Text from '@/app/_component/_text/Text';
import Image from 'next/image';
import Link from 'next/link';

export default function ConvertToProfessional() {
  const { sendPrepareMessage } = useAlterModal();

  return (
    <div className={cx(utils.d_flexColumn, utils.flex_1)}>
      <div className={cx(utils.d_flexColumn, utils.flex_1)}>
        <div
          className={cx(
            utils.d_flexColumn,
            utils.flex_1,
            utils.relative,
            utils.of_hide
          )}
        >
          <div className={cx(utils.pb_50p, utils.w_100p)}></div>
          <div
            className={cx(
              utils.absolute,
              utils.t_r_b_l_0,
              utils.w_100p,
              utils.h_100p
            )}
          >
            <Image
              className={cx(utils.w_100p, utils.h_100p)}
              src={ImageSrc}
              alt={''}
            />
          </div>
        </div>
        <div className={cx(utils.mtb_20, utils.prl_80)}>
          <Text theme="theme" size="xxxl" bold="boldest">
            X for Professionals
          </Text>
          <Text className={utils.mt_8} theme="theme" size="m" bold="normal">
            Get access to the tools you need to better connect with your
            audience, grow your brand, and increase your profits.
          </Text>
          <Text className={utils.mt_20} theme="theme" size="m" bold="normal">
            By tapping "Agree & continue", you are agreeing to our{' '}
            <Link
              className={utils.link}
              href={
                'https://help.x.com/ko/rules-and-policies/professional-account-policy'
              }
              target="_blank"
            >
              Professional Account policy.
            </Link>
          </Text>
        </div>
      </div>
      <div
        className={cx(
          utils.prl_80,
          utils.d_flexRow,
          utils.flex_alignCenter,
          utils.flex_justiCenter,
          utils.flexShrink_1
        )}
      >
        <div className={cx(utils.d_flexRow, utils.flexGrow_1)}>
          <FlexButton
            text="Agree & Continue"
            large
            grow
            onClick={() => {
              sendPrepareMessage();
            }}
          />
        </div>
      </div>
    </div>
  );
}
