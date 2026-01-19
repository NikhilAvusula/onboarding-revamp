'use client';

import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateActiveFilter, updateActiveStatus } from '@/src/redux/reducers/dashboardReducer';
import Filters from './Filters';
import SearchBar from '../../commonfields/SearchBar';
import FiltersDropdown from './FiltersDropdown';

interface DashboardToolBarProps {
  handleFilterChange: (activeFilter: 'active' | 'favourites' | 'closed') => void;
  handleSearchChange: (searchText: string) => void;
  searchValue?: string;
}

const DashboardToolBar: React.FC<DashboardToolBarProps> = ({
  handleFilterChange,
  handleSearchChange,
  searchValue,
}) => {
  const {statsData,activeFilter} = useAppSelector((state) => state.dashboard);

  const total = useMemo(() => {
      const activeData = statsData.find(item => item.category === activeFilter);
      return activeData?.overallApplications ?? 0;
    }, [statsData, activeFilter]);

  const dispatch = useAppDispatch();

  return (
    <div className="p-2 bg-[#E8E8E8] shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]]">
      <div className="lg:flex lg:items-center lg:justify-between">
        <h1 className="text-black font-[Poppins] text-[20px] font-bold leading-[21.942px] lg:block hidden">Dashboard</h1>
        <div className="lg:flex lg:space-x-4 lg:block hidden">
        <Filters handleActiveFilter={handleFilterChange} />
        </div>
        <div className="lg:flex lg:space-x-4 lg:block hidden">
          <SearchBar handleSearchChange={handleSearchChange} value={searchValue} />
        </div>
        <div className="lg:hidden flex justify-between">
          <FiltersDropdown handleActiveFilter={handleFilterChange} />
          <div className="text-lg font-semibold mt-2">{total}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolBar;