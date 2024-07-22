import style from './error.module.css';
import DisConnectSvg from '@/app/_svg/error/DisConnectSvg';
import { MouseEventHandler } from 'react';
import RefreshButton from '../buttons/RefreshButton';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function DisConnection({ onClick }: Props) {
  return (
    <div className={style.disconnection}>
      <DisConnectSvg className={style.icon} white />
      <div className={style.message}>
        <span>
          Looks like you lost your connection. Please check it and try again.
        </span>
      </div>
      <RefreshButton onClick={onClick} />
    </div>
  );
}
