'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';

export default function RightSearchZone() {
  const pathname = usePathname();

  if (['/explore', '/search'].includes(pathname)) return null;

  return (
    <div
      style={{
        width: 'inherit',
      }}
    >
      <SearchForm style={{ position: 'fixed', zIndex: 2 }} />
      <div
        style={{
          position: 'fixed',
          zIndex: 1,
          width: 'inherit',
          height: 60,
          background: 'rgba(var(--background-start-rgb), 0.5)',
          backdropFilter: 'blur(12px)',
        }}
      ></div>
    </div>
  );
}
