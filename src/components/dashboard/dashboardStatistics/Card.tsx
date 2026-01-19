'use client';

import React from 'react';
import { getStatusColor } from '../../../utils';

interface CardProps {
  statusData: {
    id: number;
    status: string;
    time: string;
    applications: number;
  };
  handleSelectStatus: (status: string) => void;
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({ statusData, handleSelectStatus, isActive }) => {
  const colors = getStatusColor(statusData.status);

  const onSelectStatus = () => {
    handleSelectStatus(statusData.status);
  };

  return (
    <div
      onClick={onSelectStatus}
      className={`p-4 ${colors.border} ${isActive ? 'border-[5px]' : 'border'} rounded cursor-pointer w-[27vw]
      `}
      style={{ borderColor: colors.border }}
    >
      <h3 className="text-lg font-semibold">{statusData.status.charAt(0).toUpperCase() + statusData.status.slice(1)}
</h3>
      <div className="flex justify-between">
      <p className="font-thin">{statusData.time}</p>
      <p className={`text-center text-[48px] font-bold leading-[130%] tracking-[-0.96px]`} style={{color: colors.border}}>{statusData.applications}</p>
      </div>
    </div>
  );
};

export default Card;