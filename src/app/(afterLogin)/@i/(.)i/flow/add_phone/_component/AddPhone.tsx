import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import styles from './iFlowAddPhone.addPhone.module.css';
import Text from '@/app/_component/_text/Text';
import IdentifierSelector from '@/app/_component/_input/IdentifierSelector';
import { FormEventHandler, useState } from 'react';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import useBackRouter from '@/app/(afterLogin)/_hooks/useBackPrevPath';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function AddPhone() {
  const backRouter = useBackRouter();
  const { alterMessage } = useAlterModal();
  const [phone, setPhone] = useState('');
  const head = 'Add a phone number';
  const sub =
    'Enter the phone number you’d like to associate with your X account. You’ll get a verification code sent here.';
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const onSubmitPhone: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!regex.test(phone)) {
      backRouter.back();
      return;
    }

    alterMessage('This feature is in preparation.', 'warning');
  };

  const countryCode = [
    { id: '+86 China', value: 86 },
    { id: '+82 South Korea', value: 82 },
    { id: '+81 Japan', value: 81 },
    { id: '+1 United States', value: 1 },
  ];
  return (
    <form className={styles.column} onSubmit={onSubmitPhone}>
      <div className={styles.body}>
        <div className={styles.title}>
          <Text text={head} size="xxxxl" bold="bold" />
          <Text text={sub} theme="gray" />
        </div>
        <div className={styles.selector}>
          <IdentifierSelector
            placeholder="Country code"
            data={countryCode}
            defaultValue={82}
          />
          <IdentifierInput
            placeholder="Your phone number"
            onChange={(value) => {
              setPhone(value);
            }}
          />
        </div>
        <IdentifierCheckBox
          title={
            <span>
              Let people who have your phone number find and connect with you on
              X.&nbsp;
              <Link
                className={styles.link}
                href="https://x.com/ko/privacy"
                target="_blank"
              >
                Learn more
              </Link>
            </span>
          }
        />
        <IdentifierCheckBox
          title={
            <span>
              Let X use your phone number to personalize our services, including
              ads (if permitted by your Ads preferences). If you don’t enable
              this, X may still use your phone number for purposes including
              account security and spam, fraud, and abuse prevention.
              <br />
              <Link
                className={styles.link}
                href="https://x.com/ko/privacy"
                target="_blank"
              >
                See our Privacy Policy for more information
              </Link>
            </span>
          }
          defaultValue
        />
      </div>
      <div className={styles.footer}>
        <FlexButton
          type="submit"
          text={regex.test(phone) ? 'Next' : 'Cancel'}
          theme={regex.test(phone) ? 'theme' : 'reverse'}
          large
        />
      </div>
    </form>
  );
}
