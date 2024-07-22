import style from './_style/photoModal.module.css';
import PhotoModalCloseButton from './_component/PhotoModalCloseButton';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default function Page({ params }: Props) {
  // const photo = {
  //   imageId: params.photoId,
  //   link: faker.image.urlLoremFlickr(),
  //   Post: {
  //     content: faker.lorem.text(),
  //   },
  // };
  return (
    <div className={style.container}>
      <PhotoModalCloseButton />
      <div className={style.imageZone}>
        {/* <img src={photo.link} alt={photo.Post?.content} /> */}
        <div
          className={style.image}
          // style={{ backgroundImage: `url(${photo.link})` }}
        />
        <div className={style.buttonZone}>
          <div className={style.buttonInner}>
            {/* <ActionButtons white /> */}
          </div>
        </div>
      </div>
      <div className={style.commentZone}>
        {/* <Post noImage />
        <CommentForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  );
}
