import React, { useMemo } from 'react'
import MobileTable from '../common/MobileTable'
import { useAppSelector } from '@/src/redux/store'
import { getStatusColor } from '@/src/utils'

const DashboardMobileTableWrapper = () => {
    const {searchedMerchantsList,activeStatus} = useAppSelector((state) => state.dashboard)
    const statusColor = getStatusColor(activeStatus);

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
      
  return (
    <div>
        <MobileTable
          data={searchedMerchantsList}
          columns={mobileColumns}
          headerColor={statusColor.border}
          headerHeight={45}
          rowHeight={45}
        />
    </div>
  )
}

export default DashboardMobileTableWrapper