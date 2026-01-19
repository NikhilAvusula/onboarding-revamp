'use client';

import React, { useState } from 'react';

interface FiltersDropdownProps {
  handleActiveFilter: (activeFilter: 'active' | 'favourites' | 'closed') => void;
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ handleActiveFilter }) => {
  const [activeFilter, setActiveFilter] = useState<'active' | 'favourites' | 'closed'>('active');

  const onActiveFilter = (filter: 'active' | 'favourites' | 'closed') => {
    handleActiveFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <select
      value={activeFilter}
      onChange={(e) => onActiveFilter(e.target.value as 'active' | 'favourites' | 'closed')}
      className="px-4 py-2 rounded"
    >
      <option value="active">Active Applications</option>
      <option value="favourites">Favourite</option>
      <option value="closed">Closed Applications</option>
    </select>
  );
};

export default FiltersDropdown;