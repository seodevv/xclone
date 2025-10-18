import styles from './userAdditional.module.css';
import cx from 'classnames';
import Link from 'next/link';
import LocationSvg from '@/app/_svg/tweet/LocationSvg';
import ReferenceSvg from '@/app/_svg/profile/ReferenceSvg';
import CalendarSvg from '@/app/_svg/profile/CalendarSvg';
import BalloonSvg from '@/app/_svg/profile/BalloonSvg';

interface DefaultProps {
  icon: 'location' | 'refer' | 'calendar' | 'balloon';
  text?: string;
  children?: React.ReactNode;
}

interface PropsA extends DefaultProps {
  type: 'link';
  href: string;
}

interface PropsB extends DefaultProps {
  type: 'div';
}

export default function UserAdditional(props: PropsA | PropsB) {
  if (props.type === 'link') {
    return (
      <Link
        className={cx(styles.additional, styles.link)}
        href={props.href}
        target="_blank"
      >
        <div className={styles.svg}>
          <SvgSelector icon={props.icon} />
        </div>
        {props.text && <span>{props.text}</span>}
        {props.children}
      </Link>
    );
  }

  return (
    <div className={cx(styles.additional, styles.div)}>
      <div className={styles.svg}>
        <SvgSelector icon={props.icon} />
      </div>
      {props.text && <span>{props.text}</span>}
      {props.children}
    </div>
  );
}

function SvgSelector({ icon }: { icon: DefaultProps['icon'] }) {
  const width = 18.75;
  switch (icon) {
    case 'location':
      return <LocationSvg width={width} />;
    case 'refer':
      return <ReferenceSvg width={width} />;
    case 'calendar':
      return <CalendarSvg width={width} />;
    case 'balloon':
      return <BalloonSvg width={width} />;
    default:
      return null;
  }
}
