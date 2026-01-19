'use client';

import React from 'react';
import { getStatusColor } from '../../../utils';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { updateActiveStatus } from '@/src/redux/reducers/dashboardReducer';

interface CardProps {
  statusData: {
    id: number;
    status: string;
    time: string;
    applications: number;
  };
}

const Card: React.FC<CardProps> = ({ statusData }) => {
  const {activeStatus} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const colors = getStatusColor(statusData.status);

  const onSelectStatus = () => {
    dispatch(updateActiveStatus(statusData.status));
  };

  const isActive = activeStatus === statusData.status

  return (
    <div
      onClick={onSelectStatus}
      className={`p-4 ${colors.border} ${isActive ? 'border-[5px]' : 'border'} bg-[#F6F6F6] rounded cursor-pointer w-[27vw] rounded-lg
      `}
      style={{ borderColor: colors.border }}
    >
      <h3 className="text-[20px] font-semibold leading-[20px] tracking-[-0.4px]">{statusData.status.charAt(0).toUpperCase() + statusData.status.slice(1)}
</h3>
      <div className="flex justify-between items-center">
      <p className="text-[18px] font-light leading-[20px] tracking-[-0.36px]">{statusData.time}</p>
      <p className={`text-center text-[48px] font-bold leading-[130%] tracking-[-0.96px]`} style={{color: colors.border}}>{statusData.applications}</p>
      </div>
    </div>
  );
};

export default Card;