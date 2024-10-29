import stlyes from './pageFixedBackground.module.css';

interface Props {
  children?: React.ReactNode;
}

export default function PageFixedBackground({ children }: Props) {
  return <div className={stlyes.background}>{children}</div>;
}
