import DivideLine from '@/app/_component/_util/DivideLine';

interface Props {
  position: 'top' | 'bottom' | 'top-bottom' | 'none';
  order?: number;
  children: React.ReactNode;
}

export default function DivideLineWrapper({
  position = 'top-bottom',
  order,
  children,
}: Props) {
  return (
    <div style={{ order }}>
      {(position === 'top' || position === 'top-bottom') && <DivideLine />}
      {children}
      {(position === 'bottom' || position === 'top-bottom') && <DivideLine />}
    </div>
  );
}
