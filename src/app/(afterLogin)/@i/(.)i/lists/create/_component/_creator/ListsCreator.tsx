'use client';

import styles from './creator.module.css';
import cx from 'classnames';
import IdentifierTextarea from '@/app/_component/_input/IdentifierTextarea';
import IdentifierInput from '@/app/_component/_input/IdentifierInput';
import { useContext } from 'react';
import { IListsContext } from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import ListsCreatorOptions from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_creator/ListsCreatorOptions';
import ListsCreatorTop from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_creator/ListsCreatorTop';
import useListsStore from '@/app/(afterLogin)/_store/ListsStore';
import Link from 'next/link';
import GreatherArrowSvg from '@/app/_svg/arrow/GreatherArrowSvg';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import useUnListsMutation from '@/app/(afterLogin)/_hooks/useUnListsMutation';
import { useSession } from 'next-auth/react';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';
import { useRouter } from 'next/navigation';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function ListsCreator() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mode, state, dispatch } = useContext(IListsContext);
  const { sendErrorMessage } = useAlterModal();
  const { open, close } = useConfirmStore(confirmSelector);
  const { lists, setSuggested } = useListsStore((state) => ({
    lists: state.lists,
    setSuggested: state.setSuggested,
  }));
  const unListsMutation = useUnListsMutation();
  const resetStack = useHistoryStore((state) => state.resetStack);

  const onSuccessHandler = (
    type: 'setName' | 'setDescription',
    payload: string
  ) => {
    dispatch({ type, payload });
    if (type === 'setName' && payload === '') {
      dispatch({ type: 'setDisable', payload: true });
    }
  };
  const onErrorHandler = () => {
    dispatch({ type: 'setDisable', payload: true });
  };

  const onClickDeleteList = () => {
    if (typeof lists === 'undefined') return;
    if (!session?.user?.email) return;

    const sessionid = session.user.email;

    open({
      flag: true,
      title: 'Delete List?',
      sub: 'This can’t be undone and you’ll lose your List.',
      btnText: 'Delete',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        unListsMutation.mutate(
          { listid: lists.id, sessionid },
          {
            onSuccess: () => {
              resetStack();
              close();
              router.replace(`/${sessionid}/lists`);
            },
            onError: () => {
              sendErrorMessage();
            },
          }
        );
      },
      noHidden: true,
    });
  };

  return (
    <div className={styles.creator}>
      <ListsCreatorTop />
      <div className={styles.inputs}>
        <IdentifierInput
          placeholder="Name"
          defaultValue={
            state.name
              ? state.name
              : mode === 'edit' && lists
              ? lists.name
              : state.name
          }
          validate={{ allowBlank: true, maxLength: 25 }}
          onSuccess={(value) => onSuccessHandler('setName', value)}
          onError={onErrorHandler}
        />
      </div>
      <div className={styles.inputs}>
        <IdentifierTextarea
          placeholder="Description"
          defaultValue={
            state.description
              ? state.description
              : mode === 'edit' && lists
              ? lists.description || undefined
              : state.description || undefined
          }
          validate={{ maxLength: 100 }}
          minRow={3}
          maxRow={3}
          onSuccess={(value) => onSuccessHandler('setDescription', value)}
          // onError={onErrorHandler}
        />
      </div>
      <ListsCreatorOptions />
      {mode === 'edit' && lists && (
        <>
          <Link
            className={cx(styles.action, styles.manage)}
            href={`/i/lists/${lists.id}/members`}
            onClick={() => setSuggested(true)}
            scroll={false}
          >
            <div className={styles.members}>
              <span>Manage members</span>
              <GreatherArrowSvg />
            </div>
          </Link>
          <button
            className={cx(styles.action, styles.delete)}
            type="button"
            onClick={onClickDeleteList}
          >
            Delete List
          </button>
        </>
      )}
    </div>
  );
}
