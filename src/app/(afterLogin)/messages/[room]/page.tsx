import { faker } from '@faker-js/faker';
import style from './_style/chatRoom.module.css';
import Link from 'next/link';
import cx from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function RoomPage() {
  const user = {
    id: 'hero',
    nickname: '영웅',
    image: faker.image.avatar(),
  };
  const messages = [
    {
      messageid: 1,
      roomid: 123,
      id: 'zerohch0',
      content: '안녕하세요.',
      createdAt: new Date(),
    },
    {
      messageid: 2,
      roomid: 123,
      id: 'hero',
      content: '안녕히가세요.',
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        {/* <BackButton /> */}
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        {/* <img src={user.image} alt={user.id} /> */}
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === 'zerohch0') {
            // 내 메시지면
            return (
              <div
                key={m.messageid}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageid}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
