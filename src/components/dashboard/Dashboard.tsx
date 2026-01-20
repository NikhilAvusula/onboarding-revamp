'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/src/redux/store';
import { updateStatsData, updateMerchantsList, updateActiveStatus, updateSearchedMerchantsList, updateSearchQuery } from '@/src/redux/reducers/dashboardReducer';
import ApiService from '@/src/services/service';
import DashboardToolBar from './dashboardToolBar/DashboardToolBar';
import DashboardStatistics from './dashboardStatistics/DashboardStatistics';
import DashboardTableWrapper from './DashboardTableWrapper';
import DashboardMobileTableWrapper from './DashboardMobileTableWrapper';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const apiService = new ApiService();

  const getStats = async(activeFilter?: 'active' | 'favourites' | 'closed') => {
    try {
      const response = await apiService.getStats();
      dispatch(updateStatsData(response?.data || []));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getMerchantsList = async (status?:string) => {  
    try {
       const payload ={
        status: status
      }
      const response = await apiService.getMerchantsList();
      dispatch(updateMerchantsList(response?.data));
      dispatch(updateSearchedMerchantsList(response?.data || []));
    } catch (error) {
      console.error('Error fetching merchants:', error);
    }
  };

  const handleFilterChange = (activeFilter: 'active' | 'favourites' | 'closed') => {
    dispatch(updateActiveStatus(''));
    dispatch(updateSearchQuery(''));
    getStats(activeFilter);
    getMerchantsList();
  };

  useEffect(() => {
    getStats('active');
    getMerchantsList();
  }, []);

  return (
    <div>
      <DashboardToolBar handleFilterChange={handleFilterChange}/>
      <DashboardStatistics getMerchants={getMerchantsList}/>
      <div className="lg:block hidden lg:px-10">
        <DashboardTableWrapper />
      </div>
      <div className="lg:hidden py-2 flex justify-between">
        <DashboardMobileTableWrapper />
      </div>
    </div>
  ); 
};

export default Dashboard;