import styles from './pageNotice.module.css';
import utils from '@/app/utility.module.css';
import Text from '@/app/_component/_text/Text';

interface Props {
  title: string | JSX.Element;
  sub?: string | JSX.Element;
  btnText?: string;
  onClick?: () => void;
}

export default function PageNotice({ title, sub, btnText, onClick }: Props) {
  return (
    <div className={styles.container}>
      <Text className={utils.mb_8} size="xxxxl" bold="boldest">
        {title}
      </Text>
      {sub && (
        <Text className={utils.mb_28} theme="gray">
          {sub}
        </Text>
      )}
      {typeof onClick === 'function' && (
        <button className={styles.button} onClick={onClick}>
          <Text size="l" bold="bold">
            {btnText ? btnText : 'ok'}
          </Text>
        </button>
      )}
    </div>
  );
}
