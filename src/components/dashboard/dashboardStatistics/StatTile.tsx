'use client';

import React from 'react';
import { getStatusColor } from '@/src/utils';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateActiveStatus } from '@/src/redux/reducers/dashboardReducer';

interface StatTileProps {
  statusData: {
    id: number;
    status: string;
    time: string;
    applications: number;
  };
  getMerchants: (status?:string) => void;
}

const StatTile: React.FC<StatTileProps> = ({ statusData, getMerchants }) => {
  const dispatch = useAppDispatch();
  const {activeStatus} = useAppSelector((state) => state.dashboard);
  const colors = getStatusColor(statusData.status);

  const onSelectStatus = () => {
    dispatch(updateActiveStatus(statusData.status));
    getMerchants(statusData.status);
  };

  const isActive = activeStatus === statusData.status;

  return (
    <div
      onClick={onSelectStatus}
      className={`py-1 px-0 borderflex justify-center cursor-pointer ${isActive ? 'bg-gray-100' : ''}`}

    >
      <h3 
      className={`text-lg font-semibold`}
      style={{ color: colors.border }}
      >{statusData.status.charAt(0).toUpperCase() + statusData.status.slice(1)}
</h3>
    </div>
  );
};

export default StatTile;