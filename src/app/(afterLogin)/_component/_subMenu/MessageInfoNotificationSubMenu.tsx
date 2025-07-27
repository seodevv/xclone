import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';

type Time = '1h' | '8h' | '1w' | 'forever';

interface Props {
  callback?: (time: Time) => void;
}

export default function MessageInfoNotificationSubMenu({ callback }: Props) {
  const onClickSubMenu = (value: '1h' | '8h' | '1w' | 'forever') => {
    if (typeof callback === 'function') {
      callback(value);
    }
  };

  return (
    <SubMenuWrapper>
      <SubMenu type="div" title="1 hour" onClick={() => onClickSubMenu('1h')} />
      <SubMenu
        type="div"
        title="8 hours"
        onClick={() => onClickSubMenu('8h')}
      />
      <SubMenu type="div" title="1 week" onClick={() => onClickSubMenu('1w')} />
      <SubMenu
        type="div"
        title="forever"
        onClick={() => onClickSubMenu('forever')}
      />
    </SubMenuWrapper>
  );
}
