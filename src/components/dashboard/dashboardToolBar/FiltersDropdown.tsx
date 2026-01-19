'use client';

import { updateActiveFilter } from '@/src/redux/reducers/dashboardReducer';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import React from 'react';

interface FiltersDropdownProps {
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ }) => {
  const {activeFilter} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const onActiveFilter = (filter: 'active' | 'favourites' | 'closed') => {
    dispatch(updateActiveFilter(filter));
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