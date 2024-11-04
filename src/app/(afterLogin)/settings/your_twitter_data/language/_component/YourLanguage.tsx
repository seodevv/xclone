'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';

export default function YourLanguage() {
  return (
    <div>
      <div>
        <Text className={utils.p_basic} theme="gray">
          This is your account’s primary language setting.
        </Text>
        <DivideLine />
        <Text className={utils.p_basic}>English</Text>
        <DivideLine />
      </div>
      <div>
        <Text className={utils.p_basic} theme="gray">
          These additional languages are used to personalize your experience.
        </Text>
        <DivideLine />
        <Text className={cx(utils.p_basic, utils.pt_0)}>
          <IdentifierCheckBox title="Korean" defaultValue={true} />
        </Text>
      </div>
    </div>
  );
}
