import styles from './orderList.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Text from '@/app/_component/_text/Text';

export interface IOrderList {
  title: string;
  sub: string;
}

interface Props {
  data: IOrderList[];
  size?: 'big' | 'middle' | 'small';
  align?: 'start' | 'center' | 'end';
}

export default function OrderList({
  data,
  size = 'big',
  align = 'start',
}: Props) {
  return (
    <ul className={cx(styles.flex_column, styles.listBox)}>
      {data.map((v, i) => (
        <li
          key={i}
          className={cx(styles.list, styles[`padding_${size}`], styles[align])}
        >
          <div className={cx(styles.flex_column, styles.order)}>
            <div className={cx(styles.circle, styles[size])}>
              <Text
                theme="black"
                text={(i + 1).toString()}
                size={size === 'big' ? 'xl' : size === 'middle' ? 'l' : 'm'}
                bold={'bold'}
              />
            </div>
          </div>
          <div className={cx(styles.flex_column, styles.text)}>
            <Text size={'l'} bold={size === 'big' ? 'bold' : 'normal'}>
              {v.title}
            </Text>
            <Text
              className={cx(size === 'big' && utils.mt_4)}
              theme="gray"
              size={size === 'big' ? 'm' : size === 'middle' ? 's' : 'xs'}
            >
              {v.sub}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
