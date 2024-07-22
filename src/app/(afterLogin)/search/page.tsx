import style from './search.module.css';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import Tab from '@/app/(afterLogin)/search/_component/Tab';

type Props = {
  searchParams: { q: string; f?: string; pf?: string; lf?: string };
};
export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>{/* <BackButton /> */}</div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
        {/* <SearchResult searchParams={searchParams} /> */}
      </div>
    </main>
  );
}
