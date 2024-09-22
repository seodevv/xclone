'use client';

import styles from './i.premiumSignUp.table.module.css';
import cx from 'classnames';
import { CSSProperties, useContext } from 'react';
import PremiumList from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/_information/PremiumList';
import { PremiumSignUpContext } from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_provider/PremiumSignUpProvider';

interface InformationList {
  type: string;
  value?: string;
  inform?: string;
}

type Subscribe = {
  [key in string]: InformationList;
};

interface Props {
  className?: string;
  style?: CSSProperties;
  table: {
    index: { id: string; value: InformationList }[];
    basic: Subscribe;
    premium: Subscribe;
    premiumPlus: Subscribe;
  };
}

export default function PremiumInformationTable({
  className,
  style,
  table,
}: Props) {
  const { state } = useContext(PremiumSignUpContext);

  return (
    <div className={cx(styles.table, className)} style={style}>
      {table.index.map((v) => {
        const type = v.id === 'head' ? 'headline' : 'list';
        const value =
          state.mode === 'all'
            ? [
                v.value,
                table.basic[v.id],
                table.premium[v.id],
                table.premiumPlus[v.id],
              ]
            : [v.value, table.premium[v.id], table.premiumPlus[v.id]];
        if (value.some((v) => typeof v === 'undefined')) return null;
        return <PremiumList key={v.id} type={type} value={value} />;
      })}
    </div>
  );
}
