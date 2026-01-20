'use client';

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export interface TableData {
  [key: string]: any;
}

export interface MobileTableProps {
  data: TableData[];
  columns: {
    field: string;
    header: string;
    width?: number;
    minWidth?: number;
    render?: (value: any) => React.ReactNode;
  }[];
  headerColor?: string;
  className?: string;
  headerHeight?: number;
  rowHeight?: number;
}

const MobileTable: React.FC<MobileTableProps> = ({
  data,
  columns,
  headerColor = '#e5e7eb',
  className = '',
  headerHeight = 40,
  rowHeight = 40,
}) => {
  // Convert mobile columns to AG Grid columns
  const agGridColumns: ColDef[] = columns.map(col => ({
    headerName: col.header,
    field: col.field,
    width: col.width,
    flex: 1,
    minWidth: col.minWidth || col.width || 150,
    cellRenderer: col.render ? (params: any) => col.render!(params.value) : undefined,
    headerClass: 'mobile-header',
    cellClass: 'mobile-cell',
    resizable: false,
  }));

  // Row style function to apply background colors
  const getRowStyle = (params: any) => {
    const rowIndex = params.node.rowIndex;
    if (rowIndex % 2 === 1) {
      return { backgroundColor: '#F6F6F6' };
    }
    return { backgroundColor: 'rgba(204, 204, 204, 0.47)' };
  };

  return (
    <div className={`w-[100vw] overflow-hidden ${className}`}>
      <style jsx>{`
        .mobile-header {
          background-color: ${headerColor} !important;
          color: #1f2937 !important;
          font-weight: 400 !important;
          font-size: 14px !important;
        }
        .mobile-header .ag-sort-order-icon {
          fill: #fff !important;
          color: #fff !important;
        }
        .mobile-header .ag-icon {
          fill: #fff !important;
          color: #fff !important;
        }
        .mobile-header .ag-header-cell .ag-icon {
          fill: #fff !important;
          color: #fff !important;
        }
        .mobile-header .ag-sort-indicator-icon {
          fill: #fff !important;
          color: #fff !important;
        }
        .mobile-cell {
          padding: 8px 12px !important;
          font-size: 14px !important;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .ag-cell[col-id="isFavourite"] {
          display:flex;
          justify-content: center;
          align-items: center;
          min-width: 60px !important;
          width: 60px !important;
          max-width: 60px !important;
          flex: 0 0 60px !important;
        }
        .ag-theme-alpine {
          border: 1px solid #e5e7eb;
          font-family: inherit;
          max-width: 100%;
          overflow-x: auto;
        }
        .ag-theme-alpine .ag-header {
          border-bottom: 2px solid ${headerColor};
        }
        .ag-theme-alpine .ag-row {
          border-bottom: 1px solid #f3f4f6;
        }
        .ag-theme-alpine .ag-row:nth-child(even) {
          background-color: #f9fafb;
        }
        .ag-theme-alpine .ag-row:hover {
          background-color: #f3f4f6;
        }
        .ag-theme-alpine .ag-root-wrapper {
          overflow-x: auto;
        }
        .ag-theme-alpine .ag-center-cols-container {
          min-width: 300px; /* Ensure at least 2 columns visible */
        }      
      `}</style>
      <div className="ag-theme-alpine" style={{ height: 'auto', minHeight: '200px' }}>
        <AgGridReact
          rowData={data}
          columnDefs={agGridColumns}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          domLayout="autoHeight"
          suppressMovableColumns={true}
          suppressColumnVirtualisation={true}
          suppressRowVirtualisation={true}
          enableCellTextSelection={true}
          theme="legacy"
          getRowStyle={getRowStyle}
        />
      </div>
    </div>
  );
};

export default MobileTable;
