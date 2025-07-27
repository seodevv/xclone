import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import AlarmSvg from '@/app/_svg/post/AlarmSvg';
import DeleteSvg from '@/app/_svg/post/DeleteSvg';
import PinedSvg from '@/app/_svg/post/PinedSvg';
import ReportSvg from '@/app/_svg/post/ReportSvg';

export default function RoomSubMenu() {
  const width = 18.75;
  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="div"
        svg={<PinedSvg width={width} white />}
        title="Pin conversation"
        onClick={() => {}}
      />
      <SubMenu
        type="div"
        svg={<AlarmSvg width={width} type="off" white />}
        title="Snooze conversation"
        onClick={() => {}}
      />
      <SubMenu
        type="div"
        svg={<ReportSvg width={width} white />}
        title="Report conversation"
        onClick={() => {}}
      />
      <SubMenu
        type="div"
        theme="red"
        svg={<DeleteSvg width={width} />}
        title="Delete conversation"
        onClick={() => {}}
      />
    </SubMenuWrapper>
  );
}
