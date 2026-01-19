'use client';

import React from 'react';
import { getStatusColor } from '@/src/utils';

interface StatTileProps {
  statusData: {
    id: number;
    status: string;
    time: string;
    applications: number;
  };
  handleSelectStatus: (status: string) => void;
  isActive: boolean;
}

const StatTile: React.FC<StatTileProps> = ({ statusData, handleSelectStatus, isActive }) => {
  const colors = getStatusColor(statusData.status);

  const onSelectStatus = () => {
    handleSelectStatus(statusData.status);
  };

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