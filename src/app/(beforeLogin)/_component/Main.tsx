import styles from './beforeLogin.main.module.css';
import BeforeLoginLeft from './_left/BeforeLoginLeft';
import BeforeLoginRight from './_right/BeforeLoginRight';
import Footer from './_footer/Footer';

export default async function Main() {
  return (
    <>
      <div className={styles.container}>
        <BeforeLoginLeft />
        <BeforeLoginRight />
      </div>
      <Footer />
    </>
  );
}
