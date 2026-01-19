'use client';

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export interface TableData {
  [key: string]: any;
}

export interface TableProps {
  data: TableData[];
  columns: ColDef[];
  headerColor?: string;
  className?: string;
  styles:any
}

const Table: React.FC<TableProps> = ({ 
  data, 
  columns, 
  headerColor = '#3b82f6', // Default blue color
  className = '', 
  styles
}) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    resizable: false,
    minWidth: 100,
  }), []);

  const getRowStyle = (params: any) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? '#f9fafb' : '#f3f4f6',
    };
  };

  const headerHeight = 40;
  const rowHeight = 48;

  return (
    <div className={`ag-theme-alpine ${className}`} style={{...styles}}>
      <style jsx global>{`
      .ag-theme-alpine .ag-header,
      .ag-theme-alpine .ag-header-row {
        background-color: ${headerColor} !important;
      }

      .ag-theme-alpine .ag-header-cell {
        background-color: ${headerColor} !important;
        color: #fff !important;
        font-weight: 600;
      }

      .ag-theme-alpine .ag-header-cell-label {
        color: #fff !important;
      }

      .ag-theme-alpine .ag-header-cell-resize {
        background-color: rgba(255, 255, 255, 0.3) !important;
      }

      .ag-theme-alpine .ag-sort-order-icon {
        fill: #fff !important;
        color: #fff !important;
      }

      .ag-theme-alpine .ag-icon {
        fill: #fff !important;
        color: #fff !important;
      }

      .ag-theme-alpine .ag-header-cell .ag-icon {
        fill: #fff !important;
        color: #fff !important;
      }

      .ag-theme-alpine .ag-sort-indicator-icon {
        fill: #fff !important;
        color: #fff !important;
      }
    `}</style>

      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        suppressCellFocus={false}
        animateRows={true}
        domLayout='normal'
        theme="legacy"
      />
    </div>
  );
};

export default Table;
