import styles from './iFlowAddEmail.module.css';
import { FormEventHandler, useRef, useState } from 'react';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import IdentifierInput, {
  IdentifierInputRef,
} from '@/app/_component/_input/IdentifierInput';
import useBackRouter from '@/app/(afterLogin)/_hooks/useBackPrevPath';
import useAlterModal from '@/app/_hooks/useAlterModal';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';

export default function AddEmail() {
  const backRouter = useBackRouter();
  const { alterMessage } = useAlterModal();
  const [email, setEmail] = useState('');
  const emailRef = useRef<IdentifierInputRef>(null);
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onSubmitEmail: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!regex.test(email)) {
      backRouter.back();
      return;
    }

    alterMessage('This feature is in preparation.', 'warning');
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    emailRef.current?.error({ flag: false });

    if (value !== '') {
      if (!regex.test(email)) {
        emailRef.current?.error({
          flag: true,
          message: 'Please enter a valid email.',
        });
      }
    }
  };

  return (
    <form className={styles.column} onSubmit={onSubmitEmail}>
      <div className={styles.body}>
        <div className={styles.title}>
          <Text size="xxxl" bold="bold">
            Change Email
          </Text>
          <Text theme="gray">
            Your current email is seodev17@gmail.com. What would you like to
            update it to? Your email is not displayed in your public profile on
            X.
          </Text>
          <Text theme="gray">
            If you change your email address, any existing Google SSO
            connections will be removed. Review Connected accounts&nbsp;
            <Link className={styles.link} href="/settings/connected_accounts">
              here.
            </Link>
          </Text>
        </div>
        <div className={styles.selector}>
          <IdentifierInput
            ref={emailRef}
            placeholder="Email address"
            autoFocus
            onChange={onChangeEmail}
          />
        </div>
        <IdentifierCheckBox
          title={
            <span>
              Let people who have your email address find and connect with you
              on X.&nbsp;
              <Link
                className={styles.link}
                href="https://help.x.com/safety-and-security/email-and-phone-discoverability-settings"
                target="_blank"
              >
                Learn more
              </Link>
            </span>
          }
        />
      </div>
      <div className={styles.footer}>
        <FlexButton
          type="submit"
          text={regex.test(email) ? 'Next' : 'Cancel'}
          theme={regex.test(email) ? 'theme' : 'reverse'}
          large
        />
      </div>
    </form>
  );
}
