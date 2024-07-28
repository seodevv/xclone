'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import SearchFilters from '../../search/_component/SearchFilters';

export default function RightSearchZone() {
  const pathname = usePathname();

  if (pathname === '/explore') {
    return null;
  }

  if (pathname === '/search') {
    return <SearchFilters />;
  }

  return (
    <div
      style={{
        paddingBottom: 60,
        width: 'inherit',
      }}
    >
      <SearchForm style={{ position: 'fixed' }} />
    </div>
  );
}
