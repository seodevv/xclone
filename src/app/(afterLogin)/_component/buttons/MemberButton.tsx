'use client';

import styles from './button.module.css';
import cx from 'classnames';
import { CSSProperties, MouseEventHandler } from 'react';
import { AdvancedUser } from '@/model/User';
import { AdvancedLists } from '@/model/Lists';
import { useQueryClient } from '@tanstack/react-query';
import useListsMemberMutation from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_hooks/useListsMemberMutation';

interface Props {
  className?: string;
  style?: CSSProperties;
  lists: AdvancedLists;
  user: AdvancedUser;
  disabled?: boolean;
}

export default function MemberButton({
  className,
  style,
  lists,
  user,
  disabled,
}: Props) {
  const isMember = lists.Member.map((m) => m.id).includes(user.id);
  const queryClient = useQueryClient();
  const listsMemberMutation = useListsMemberMutation();

  const onClickMember: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    listsMemberMutation.mutate({
      queryClient,
      optimistic: false,
      method: isMember ? 'delete' : 'post',
      listid: lists.id,
      member: user,
    });
  };

  return (
    <button
      className={cx(
        styles.btn,
        styles.memberBtn,
        isMember && styles.memberRemoveBtn,
        className
      )}
      style={style}
      type="button"
      onClick={onClickMember}
      disabled={disabled}
    >
      {isMember ? 'Remove' : 'Add'}
    </button>
  );
}
