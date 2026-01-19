'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateStatsData, updateMerchantsList, updateActiveFilter, updateActiveStatus, updateSearchedMerchantsList, updateSearchQuery } from '@/src/redux/reducers/dashboardReducer';
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
  const dispatch = useAppDispatch();
  const { merchantsList, activeStatus, activeFilter,searchedMerchantsList } = useAppSelector((state) => state.dashboard);

  const apiService = new ApiService();

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
      dispatch(updateStatsData(mockStatsData as CategoryStats[]));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getMerchantsList = async (status?:string) => {  
    try {
      // const response = await apiService.getMerchantsList(status);
      // dispatch(updateMerchantsList(response.data));
      dispatch(updateMerchantsList(mockMerchantsList as MerchantItem[]));
      dispatch(updateSearchedMerchantsList(mockMerchantsList as MerchantItem[]));
    } catch (error) {
      console.error('Error fetching merchants:', error);
    }
  };
  
  const statusColor = getStatusColor(activeStatus);

  useEffect(() => {
    getStats('active');
    getMerchantsList();
  }, []);

  useEffect(() => {
    dispatch(updateActiveStatus(''));
    dispatch(updateSearchQuery(''));
    getStats(activeFilter);
    getMerchantsList();
  }, [activeFilter]);

  useEffect(()=>{
    getMerchantsList(activeStatus);
  },[activeStatus])

  return (
    <div>
      <DashboardToolBar/>
      <DashboardStatistics/>
      <div className="lg:block hidden lg:px-10">
        <Table
          data={searchedMerchantsList}
          columns={tableColumns}
          headerColor={statusColor.border}
          styles={{borderRadius:'10px',height :400}}
        />
      </div>
      <div className="lg:hidden py-2 flex justify-between">
        <MobileTable
          data={searchedMerchantsList}
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