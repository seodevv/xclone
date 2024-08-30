import { CSSProperties } from 'react';
import PremiumList from '@/app/(afterLogin)/@i/(.)i/premium_sign_up/_component/_information/PremiumList';

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
  return (
    <div className={className} style={style}>
      {table.index.map((v) => {
        const type = v.id === 'head' ? 'headline' : 'list';
        const value = [
          v.value,
          table.basic[v.id],
          table.premium[v.id],
          table.premiumPlus[v.id],
        ];
        if (value.some((v) => typeof v === 'undefined')) return null;
        return <PremiumList key={v.id} type={type} value={value} />;
      })}
    </div>
  );
}
