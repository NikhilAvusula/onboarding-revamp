'use client';

import { getStatusColor } from '@/src/utils';
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export interface PieChartData {
  status: string;
  applications: number;
}

export interface PieChartProps {
  data: PieChartData[];
  total: number;
  size?: number;
  className?: string;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  total, 
  size = 256, 
  className = '' 
}) => {
  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      prequalification: '#9333ea', // purple-600
      underwriting: '#ea580c',     // orange-600
      application: '#2563eb',      // blue-600
      onboarding: '#991b1b',       // red-800
    };
    return colorMap[status.toLowerCase()] || '#6b7280'; // gray-500 as default
  };

  const getStatusLabel = (status: string): string => {
    const labelMap: Record<string, string> = {
      prequalification: 'Prequalification',
      underwriting: 'Underwriting',
      application: 'Application',
      onboarding: 'Onboarding',
    };
    return labelMap[status.toLowerCase()] || status;
  };

  const chartData = data.map(item => ({
    ...item,
    name: getStatusLabel(item.status),
    color: getStatusColor(item.status)
  }));

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show labels for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div style={{ width: size, height: size, minWidth: 0, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={size * 0.4}
              innerRadius={size * 0.25}
              fill="#8884d8"
              dataKey="applications"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{total}</div>
          <div className="text-sm text-gray-600">Applications</div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
