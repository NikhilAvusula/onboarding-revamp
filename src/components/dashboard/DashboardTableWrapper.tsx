import React, { useMemo } from 'react'
import Table from '../common/Table'
import { useAppSelector } from '@/src/redux/store'
import { getStatusColor } from '@/src/utils'
import { ColDef } from 'ag-grid-community'

const DashboardTableWrapper = () => {
    const {searchedMerchantsList,activeStatus} = useAppSelector((state) => state.dashboard)

    const statusColor = getStatusColor(activeStatus);

     // Define table columns for merchants
    const tableColumns: ColDef[] = useMemo(() => [
    {
        headerName: 'Merchant Name',
        field: 'merchantName',
        flex: 1,
        cellRenderer: (params: { value: string }) => (
        <span className="font-medium text-gray-900">{params.value}</span>
        ),
    },
    {
        headerName: 'Product',
        field: 'product',
        flex: 1,
        cellRenderer: (params: { value: string }) => (
        <span className="text-gray-700">{params.value}</span>
        ),
    },
    {
        headerName: 'Creation Date',
        field: 'creationDate',
        flex: 1,
        cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
        ),
    },
    {
        headerName: 'Stage',
        field: 'stage',
        flex: 1,
        cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
        ),
    },
    {
        headerName: 'Contact Name',
        field: 'contactName',
        flex: 1,
        cellRenderer: (params: { value: string }) => (
        <span className="text-gray-600 text-sm">{params.value}</span>
        ),
    },
    ], []);
  return (
    <div>
        <Table
          data={searchedMerchantsList}
          columns={tableColumns}
          headerColor={statusColor.border}
          styles={{borderRadius:'10px',height :400}}
        />
    </div>
  )
}

export default DashboardTableWrapper