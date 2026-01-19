'use client';

import React from 'react';
import OverallApplications from './OverallApplications';
import StatusCards from './StatusCards';

interface DashboardStatisticsProps {
  getMerchants: (status?:string) => void;
}

const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({ getMerchants }) => {
  return (
    <div className="lg:mb-4 lg:px-10 lg:py-6 px-2 py-0 ">
      <div className="lg:flex justify-between">
        <div className="lg:block hidden">
          <OverallApplications />
        </div>
        <StatusCards getMerchants={getMerchants} />
      </div>
    </div>
  );
};

export default DashboardStatistics;