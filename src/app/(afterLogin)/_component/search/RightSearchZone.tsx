'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';

export default function RightSearchZone() {
  const pathname = usePathname();

  if (['/explore', '/search', '/messages', '/settings'].includes(pathname))
    return null;

  return (
    <div
      style={{
        paddingTop: 5,
        position: 'sticky',
        top: 0,
        zIndex: 2,
        height: 60,
        background: 'rgba(var(--background-start-rgb), 0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <SearchForm />
    </div>
  );
}
