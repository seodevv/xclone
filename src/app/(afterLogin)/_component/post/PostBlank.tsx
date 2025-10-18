import utils from '@/app/utility.module.css';
import cx from 'classnames';

interface Props {
  hasNextPage?: boolean;
}

export default function PostBlank({ hasNextPage }: Props) {
  if (hasNextPage) return null;
  return <div className={cx(utils.pb_300, utils.flexOrder_9999)}></div>;
}
