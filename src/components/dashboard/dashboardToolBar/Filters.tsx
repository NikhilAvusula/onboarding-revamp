'use client';

import React, { useState } from 'react';

interface FiltersProps {
  handleActiveFilter: (activeFilter: 'active' | 'favourites' | 'closed') => void;
}

const Filters: React.FC<FiltersProps> = ({ handleActiveFilter }) => {
  const [activeFilter, setActiveFilter] = useState<'active' | 'favourites' | 'closed'>('active');

  const onActiveFilter = (filter: 'active' | 'favourites' | 'closed') => {
    handleActiveFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className="flex space-x-20">
      <button
        onClick={() => onActiveFilter('active')}
      >
        <p className={`text-[#3A3A3A] font-[Poppins] text-[18px] leading-[21.942px]
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