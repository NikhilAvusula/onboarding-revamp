'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/store';
import { updateActiveStatus } from '@/src/redux/reducers/dashboardReducer';
import Card from './Card';
import StatTile from './StatTile';
import { CategoryStats } from '@/src/models/dashboardModels';

interface StatusCardsProps {
  getMerchants: (status?:string) => void;
}

const StatusCards: React.FC<StatusCardsProps> = ({ getMerchants }) => {
  const dispatch = useAppDispatch();
  const { statsData, activeFilter, activeStatus: reduxActiveStatus } = useAppSelector((state) => state.dashboard);
  const [activeStatus, setActiveStatus] = useState(reduxActiveStatus || '');

  // Sync local activeStatus with Redux state when it changes
  useEffect(() => {
    setActiveStatus(reduxActiveStatus || '');
  }, [reduxActiveStatus]);

  const filteredStatsData = useMemo(() => {
    const activeData = statsData.find((item: CategoryStats) => item.category === activeFilter);
    return activeData?.statsData ?? [];
  }, [statsData, activeFilter]);

  const handleSelectStatus = (status: string) => {
    getMerchants(status);
    setActiveStatus(status);
    dispatch(updateActiveStatus(status));
  };

  return (
    <div>
      {/* Desktop View - Cards - 2 per row */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20">
        {filteredStatsData.map((item) => (
          <div key={item.id}>
            <Card
              statusData={item}
              handleSelectStatus={handleSelectStatus}
              isActive={activeStatus === item.status}
            />
          </div>
        ))}
      </div>

      {/* Mobile View - StatTiles with horizontal scroll */}
      <div className="lg:hidden w-full overflow-hidden">
        <div 
          className="flex gap-4 overflow-x-auto scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {filteredStatsData.map((item) => (
            <div 
              key={`mobile-${item.id}`} 
              data-status={item.status}
              className="flex-shrink-0 w-35"
            >
              <StatTile
                statusData={item}
                handleSelectStatus={handleSelectStatus}
                isActive={activeStatus === item.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCards;