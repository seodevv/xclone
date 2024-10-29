'use client';

import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import ListsMember from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_component/ListsMember';
import useGetListsMemberQuery from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_hooks/useGetListsMemberQuery';
import useGetSingleListsQuery from '@/app/(afterLogin)/i/lists/[listid]/_hooks/useGetSingleListsQuery';

interface Props {
  listid: string;
  filter: 'members' | 'followers';
}

export default function ListsUserList({ listid, filter }: Props) {
  const { data: members } = useGetListsMemberQuery({ listid, filter });
  const { data: lists, isError, error } = useGetSingleListsQuery(listid);

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
