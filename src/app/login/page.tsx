import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Main from '@/app/(beforeLogin)/_component/Main';
import RedirectToLogin from './_component/RedirectToLogin';

export default function LoginPage() {
  return (
    <main className={cx(utils.d_flexColumn, utils.h_min_100dvh)}>
      <Main />
      <RedirectToLogin />
    </main>
  );
}
