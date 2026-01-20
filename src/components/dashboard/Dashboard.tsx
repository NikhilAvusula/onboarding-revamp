'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateStatsData, updateMerchantsList, updateActiveStatus, updateSearchedMerchantsList, updateSearchQuery } from '@/src/redux/reducers/dashboardReducer';
import ApiService from '@/src/services/service';
import DashboardToolBar from './dashboardToolBar/DashboardToolBar';
import DashboardStatistics from './dashboardStatistics/DashboardStatistics';
import DashboardTableWrapper from './DashboardTableWrapper';
import DashboardMobileTableWrapper from './DashboardMobileTableWrapper';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = React.useState(false);

  const apiService = new ApiService();
  const {activeStatus,activeFilter} = useAppSelector((state) => state.dashboard);

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


  useEffect(() => {
    getStats('active');
    getMerchantsList();
    setIsInitialized(true);
  }, []);

  useEffect(() =>{
    if(isInitialized){
      getMerchantsList(activeStatus);
    }
  },[activeStatus])

  useEffect(()=>{
    if(isInitialized){
      getStats(activeFilter);
      getMerchantsList();
    }
  },[activeFilter])

  return (
    <div>
      <DashboardToolBar/>
      <DashboardStatistics />
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