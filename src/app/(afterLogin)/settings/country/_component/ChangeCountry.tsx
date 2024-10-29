'use client';

import IdentifierSelector from '@/app/_component/_input/IdentifierSelector';
import styles from './changeCountry.module.css';
import Text from '@/app/_component/_text/Text';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangeCountry() {
  const router = useRouter();
  const [country, setCountry] = useState('South Korea');
  const data: { id: string; value: string | number }[] = [
    { id: 'France', value: 'France' },
    { id: 'Germany', value: 'Germany' },
    { id: 'Japan', value: 'Japan' },
    { id: 'South Korea', value: 'South Korea' },
    { id: 'United Kingdom', value: 'United Kingdom' },
    { id: 'United States', value: 'United States' },
  ];
  const onChangeSelector = (value: string) => {
    router.push('/i/flow/settings/change_country');
  };

  return (
    <div className={styles.margin}>
      <IdentifierSelector
        placeholder="Country"
        defaultValue={country}
        data={data}
        onChange={onChangeSelector}
      />
      <Text className={styles.text} theme="gray" size="xs">
        This is the primary country associated with your account. Your country
        helps us to customize your X experience.&nbsp;
        <Link
          className={styles.link}
          href="https://help.x.com/managing-your-account/how-to-change-country-settings"
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
    </div>
  );
}
