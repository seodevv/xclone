'use client';

import { useSinglePostQuery } from '@/app/(afterLogin)/[username]/status/[id]/_hooks/useSinglePostQuery';
import styles from '../_style/photoModal.module.css';
import { useContext } from 'react';
import { FoldContext } from '../_provider/FoldProvider';

interface Props {
  id: string;
}

export default function PostSection({ id }: Props) {
  const { fold } = useContext(FoldContext);
  const { data: post } = useSinglePostQuery(id);

  if (fold) return null;

  return <section className={styles.postSection}></section>;
}
