'use client';

import { updateActiveFilter } from '@/src/redux/reducers/dashboardReducer';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import React from 'react';

interface FiltersProps {
  
}

const Filters: React.FC<FiltersProps> = ({ }) => {
  const {activeFilter} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const onActiveFilter = (filter: 'active' | 'favourites' | 'closed') => {
    dispatch(updateActiveFilter(filter));
  };

  return (
    <div className="flex space-x-20">
      <button
        onClick={() => onActiveFilter('active')}
      >
        <p className={`text-[#3A3A3A] text-[18px] leading-[21.942px]
                    ${activeFilter === 'active' ? 'font-bold' : 'font-normal'}`}>Active Applications</p>
      </button>
      <button
        onClick={() => onActiveFilter('favourites')}
      >
         <p className={`text-[#3A3A3A] font-[Poppins] text-[18px] leading-[21.942px]
                    ${activeFilter === 'favourites' ? 'font-bold' : 'font-normal'}`}>Favourite</p>
      </button>
      <button
        onClick={() => onActiveFilter('closed')}
      >
         <p className={`text-[#3A3A3A] font-[Poppins] text-[18px] leading-[21.942px]
                    ${activeFilter === 'closed' ? 'font-bold' : 'font-normal'}`}>Closed Applications</p>
      </button>
    </div>
  );
};

export default Filters;