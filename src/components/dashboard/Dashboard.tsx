'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateStatsData, updateMerchantsList, updateActiveFilter, updateActiveStatus } from '@/src/redux/reducers/dashboardReducer';
import ApiService from '@/src/services/service';
import DashboardToolBar from './dashboardToolBar/DashboardToolBar';
import DashboardStatistics from './dashboardStatistics/DashboardStatistics';
import Table from '@/src/components/common/Table';
import MobileTable from '@/src/components/common/MobileTable';
import { getStatusColor } from '@/src/utils/colors';
import { statsData as mockStatsData } from '@/src/data/statsData';
import { merchantsData as mockMerchantsList } from '@/src/data/merchantsData';
import { CategoryStats, MerchantItem } from '@/src/models/dashboardModels';
import { ColDef } from 'ag-grid-community';

const Dashboard: React.FC = () => {
  const [originalMerchantsList, setOriginalMerchantsList] = React.useState<MerchantItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useAppDispatch();
  const { merchantsList, activeStatus } = useAppSelector((state) => state.dashboard);

  const apiService = new ApiService();

  // Filter merchantsList based on activeStatus
  //once data from api comes based on status and filter this is not required
  const filteredMerchantsList = useMemo(() => {
    if (activeStatus) {
      return merchantsList.filter((merchant: MerchantItem) => merchant.stage === activeStatus);
    }
    return merchantsList;
  }, [merchantsList, activeStatus]);

  // Define table columns for merchants
  const tableColumns: ColDef[] = useMemo(() => [
    {
      headerName: 'Merchant Name',
      field: 'merchantName',
      flex: 1,
      cellRenderer: (params: { value: string }) => (
        <span className="font-medium text-gray-900">{params.value}</span>
      ),
    },
    {
      headerName: 'Product',
      field: 'product',
      flex: 1,
      cellRenderer: (params: { value: string }) => (
        <span className="text-gray-700">{params.value}</span>
      ),
    },
    {
      headerName: 'Creation Date',
      field: 'creationDate',
      flex: 1,
      cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
      ),
    },
    {
      headerName: 'Stage',
      field: 'stage',
      flex: 1,
      cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
      ),
    },
    {
      headerName: 'Contact Name',
      field: 'contactName',
      flex: 1,
      cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
      ),
    },
  ], []);

  // Define mobile table columns for merchants
  const mobileColumns = useMemo(() => [
    {
      field: 'merchantName',
      header: 'Merchant Name',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      field: 'product',
      header: 'Product',
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      field: 'creationDate',
      header: 'Creation Date',
      render: (value: string) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
    },
    {
      field: 'stage',
      header: 'Stage',
      render: (value: string) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
    },
    {
      field: 'contactName',
      header: 'Contact Name',
      render: (value: string) => (
        <span className="text-gray-600 text-sm">{value}</span>
      ),
    },
  ], []);

  const getStats = (activeFilter?: 'active' | 'favourites' | 'closed') => {
    try {
      // const response = await apiService.getStats(activeFilter);
      // dispatch(updateStatsData(response.data));

       // Dispatch entire statsData from data file, not from Redux state
      console.log("Dispatching full statsData from data file:", mockStatsData);
      dispatch(updateStatsData(mockStatsData as CategoryStats[]));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getMerchantsList = async (status?:string) => {
    console.log("status>>>>",status)  
    try {
      // const response = await apiService.getMerchantsList(status);
      // dispatch(updateMerchantsList(response.data));
      dispatch(updateMerchantsList(mockMerchantsList as MerchantItem[]));
      // Store original list for search functionality
      setOriginalMerchantsList(mockMerchantsList as MerchantItem[]);
    } catch (error) {
      console.error('Error fetching merchants:', error);
    }
  };

  const handleFilterChange = (activeFilter: 'active' | 'favourites' | 'closed') => {
    console.log("Filter changed to:", activeFilter);
    dispatch(updateActiveFilter(activeFilter));
    dispatch(updateActiveStatus(''));
    getStats(activeFilter);
    getMerchantsList();
  };

  const handleSearchChange = (searchText: string) => {
    console.log("Search text:", searchText);
    setSearchQuery(searchText);
    
    if (searchText.trim() === '') {
      // If search is empty, restore original merchants list
      dispatch(updateMerchantsList(originalMerchantsList));
    } else {
      // Filter from original list, not from already filtered list
      const filtered = originalMerchantsList.filter(merchant =>
        merchant.merchantName.toLowerCase().includes(searchText.toLowerCase()));
      dispatch(updateMerchantsList(filtered));
    }
  };
  

  const statusColor = getStatusColor(activeStatus);

  useEffect(() => {
    getStats('active');
    getMerchantsList();
  }, []);

  return (
    <div>
      <DashboardToolBar
        handleFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        searchValue={searchQuery}
      />
      <DashboardStatistics getMerchants={getMerchantsList} />
      <div className="lg:block hidden lg:px-10">
        <Table
          data={filteredMerchantsList}
          columns={tableColumns}
          headerColor={getStatusColor(activeStatus).border}
          styles={{borderRadius:'10px',height :400}}
        />
      </div>
      <div className="lg:hidden py-2 flex justify-between">
        <MobileTable
          data={filteredMerchantsList}
          columns={mobileColumns}
          headerColor={statusColor.border}
          headerHeight={45}
          rowHeight={45}
        />
      </div>
    </div>
  ); 
};

export default Dashboard;