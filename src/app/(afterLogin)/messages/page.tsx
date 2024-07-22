import style from './_style/message.module.css';
import Room from '@/app/(afterLogin)/messages/_component/Room';

export default function MessagePage() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h2>Message</h2>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
