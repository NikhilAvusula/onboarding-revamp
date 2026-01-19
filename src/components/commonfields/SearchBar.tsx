'use client';

import React from 'react';
import searchIcon from '@/src/assets/icons/searchIcon.svg';
import Image from 'next/image';

interface SearchBarProps {
  handleSearchChange: (searchText: string) => void;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchChange, value = '' }) => {
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={onSearchChange}
        className="w-full px-4 py-2 pr-10 border rounded"
      />

      <Image
        src={searchIcon}
        alt="search"
        width={20}
        height={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export default SearchBar;