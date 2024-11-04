'use client';

import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';
import IdentifierCheckBox, {
  ICheckBox,
} from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginVerification() {
  const router = useRouter();
  const checks: ICheckBox[] = [
    {
      id: 0,
      title: 'Two-factor authentication',
      sub: 'Use your mobile phone to receive a text message with an authentication code to enter when you log in to X.',
      onCheck: (check, setCheck) => {
        router.push('/i/flow/two-factor-sms-enrollment', { scroll: false });
      },
    },
    {
      id: 1,
      title: 'Authentication app',
      sub: 'Use a mobile authentication app to get a verification code to enter every time you log in to X.',
      onCheck: (check, setCheck) => {
        router.push('/i/flow/two-factor-auth-app-enrollment', {
          scroll: false,
        });
      },
    },
    {
      id: 2,
      title: 'Security key',
      sub: (
        <>
          Use a security key that inserts into your computer or syncs to your
          mobile device when you log in to X. You’ll need to use a supported
          mobile device or web browser.&nbsp;
          <Link
            className={utils.link}
            href="https://help.x.com/managing-your-account/two-factor-authentication"
            target="_blank"
          >
            Learn more
          </Link>
        </>
      ),
      onCheck: (check, setCheck) => {
        router.push('/i/flow/two-factor-security-key-enrollment', {
          scroll: false,
        });
      },
    },
  ];

  return (
    <div>
      <Text className={utils.p_basic} size="xl" bold="bold">
        Two-factor authentication
      </Text>
      {checks.map((v) => (
        <div key={v.id} className={utils.p_basic}>
          <IdentifierCheckBox
            title={v.title}
            sub={v.sub}
            onCheck={v.onCheck}
            onUnCheck={v.onUnCheck}
            onChange={v.onChange}
          />
        </div>
      ))}
    </div>
  );
}
