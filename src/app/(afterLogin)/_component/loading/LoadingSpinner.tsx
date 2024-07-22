import style from './loading.module.css';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

interface Props {
  type?: 'block';
}

export default function LoadingSpinner({ type = 'block' }: Props) {
  return (
    <div className={style.loadingSpinner}>
      <SpinnerSvg type={type} />
    </div>
  );
}
