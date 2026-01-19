'use client';

import React, { act, useMemo } from 'react';
import { useAppSelector } from '@/src/redux/store';
import PieChart from '@/src/components/common/PieChart';
import { CategoryStats } from '@/src/models/dashboardModels';

const OverallApplications: React.FC = () => {
  const { activeFilter, statsData } = useAppSelector((state) => state.dashboard);

  const filteredStats = useMemo(() => {
    const activeData = statsData.find(item => item.category === activeFilter);
    return activeData?.statsData ?? [];
  }, [statsData, activeFilter]);

  const total = useMemo(() => {
    const activeData = statsData.find(item => item.category === activeFilter);
    return activeData?.overallApplications ?? 0;
  }, [statsData, activeFilter]);


  return (
    <div className="p-4 border border-[#777777] rounded-lg bg-[#F6F6F6] w-[27vw]">
      <h2 className="text-lg font-semibold">
        {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Applications
      </h2>
      <div className="mt-4 flex justify-center">
        <PieChart 
          data={filteredStats} 
          total={total}
          width={370}
          height={250}
        />
      </div>
    </div>
  );
};

export default OverallApplications;