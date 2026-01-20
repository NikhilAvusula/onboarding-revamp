'use client';

import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateActiveFilter, updateActiveStatus, updateSearchedMerchantsList, updateSearchQuery } from '@/src/redux/reducers/dashboardReducer';
import Filters from './Filters';
import SearchBar from '../../commonfields/SearchBar';
import FiltersDropdown from './FiltersDropdown';

interface DashboardToolBarProps {
}

const DashboardToolBar: React.FC<DashboardToolBarProps> = ({

}) => {
  const {statsData,activeFilter,merchantsList,searchQuery} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const total = useMemo(() => {
      const activeData = statsData.find(item => item.category === activeFilter);
      return activeData?.overallApplications ?? 0;
    }, [statsData, activeFilter]);

  const handleSearchChange = (searchText: string) => {
      dispatch(updateSearchQuery(searchText));
      
      if (searchText.trim() === '') {
        // If search is empty, restore original merchants list
        dispatch(updateSearchedMerchantsList(merchantsList));
      } else {
        // Filter from original list, not from already filtered list
        const filteredList = merchantsList.filter(merchant =>
          merchant.merchantName.toLowerCase().includes(searchText.toLowerCase()));
        dispatch(updateSearchedMerchantsList(filteredList));
      }
    };

  return (
    <div className="px-4 py-3 bg-[#E8E8E8] shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]]">
      <div className="lg:flex lg:items-center lg:justify-between">
        <h1 className="text-blacktext-[20px] font-bold leading-[21.942px] lg:block hidden">My Applications</h1>
        <div className="lg:flex lg:space-x-4 lg:block hidden">
        <Filters/>
        </div>
        <div className="lg:flex lg:space-x-4 lg:block hidden">
          <SearchBar handleSearchChange={handleSearchChange} value={searchQuery} />
        </div>
        <div className="lg:hidden flex justify-between">
          <FiltersDropdown />
          <div className="text-[#777] text-center text-[25px] font-bold leading-[130%] tracking-[-0.96px]">{total}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolBar;