'use client';

import modalStyles from '@/app/modal.module.css';
import utils from '@/app/utility.module.css';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Link from 'next/link';
import useSettingsLocalStore, {
  SearchSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';

export default function SettingsSearch() {
  const { search, setSearch } = useSettingsLocalStore(SearchSelector);

  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.body}>
        <div className={utils.p_basic}>
          <IdentifierCheckBox
            title={'Hide sensitive content'}
            sub={
              <>
                This prevents posts with potentially sensitive content from
                displaying in your search results.&nbsp;
                <Link
                  className={utils.link}
                  href={'https://help.x.com/using-x/x-search'}
                  target="_blank"
                >
                  Learn more
                </Link>
              </>
            }
            defaultValue={search.hideSensitive}
            onChange={(value) => {
              setSearch({ hideSensitive: value });
            }}
          />
        </div>
        <div className={utils.p_basic}>
          <IdentifierCheckBox
            title={'Remove blocked and muted accounts'}
            sub={
              <>
                Use this to eliminate search results from accounts you’ve
                blocked or muted.&nbsp;
                <Link
                  className={utils.link}
                  href={'https://help.x.com/using-x/x-search'}
                  target="_blank"
                >
                  Learn more
                </Link>
              </>
            }
            defaultValue={search.removeBlocks}
            onChange={(value) => {
              setSearch({ removeBlocks: value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
