'use client';

import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listId]/_hooks/useGetSingleListsQuery';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import useGetListsMemberQuery from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_hooks/useGetListsMemberQuery';
import ListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_component/ListsMember';

interface Props {
  listId: string;
  filter: 'members' | 'followers';
}

export default function ListsUserList({ listId, filter }: Props) {
  const { data: members } = useGetListsMemberQuery({ listId, filter });
  const { data: lists, isError, error } = useGetSingleListsQuery(listId);

  if (members) {
    if (members.pages[0].data.length === 0) {
      return (
        <NoPost
          title="This List is lonely"
          message={
            filter === 'members'
              ? 'People added to this List will show up here.'
              : 'People who follow this List will show up here.'
          }
        />
      );
    }

    if (!lists) return null;

    return (
      <section>
        {members.pages.map((page) =>
          page.data.map((member) => {
            return (
              <ListsMember
                key={member.id}
                filter={filter}
                lists={lists.data}
                member={member}
              />
            );
          })
        )}
      </section>
    );
  }

  if (isError) {
    throw error;
  }

  return null;
}
