import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartData[];
  height?: number;
  showGrid?: boolean;
  animate?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 200,
  showGrid = true,
  animate = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxValue - item.value) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full" style={{ height }}>
      <svg className="w-full h-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        {showGrid && (
          <g className="text-gray-200">
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="0"
                y1={(height / 4) * i}
                x2="100"
                y2={(height / 4) * i}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
          </g>
        )}
        
        <motion.polyline
          points={points}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
};

interface BarChartProps {
  data: ChartData[];
  height?: number;
  horizontal?: boolean;
  animate?: boolean;
  showValues?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  horizontal = false,
  animate = true,
  showValues = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">{item.label}</span>
            <div className="flex-1 relative">
              <motion.div
                className="h-8 rounded-md"
                style={{
                  background: item.color || `linear-gradient(to right, #3B82F6, #8B5CF6)`
                }}
                initial={animate ? { width: 0 } : { width: `${(item.value / maxValue) * 100}%` }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                {showValues && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm font-medium">
                    {item.value}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <motion.div
              className="w-full rounded-t-md relative"
              style={{
                background: item.color || `linear-gradient(to top, #3B82F6, #8B5CF6)`
              }}
              initial={animate ? { height: 0 } : { height: `${(item.value / maxValue) * 100}%` }}
              animate={{ height: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              {showValues && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700">
                  {item.value}
                </span>
              )}
            </motion.div>
            <span className="text-xs text-gray-600 mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface PieChartProps {
  data: ChartData[];
  size?: number;
  donut?: boolean;
  animate?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  donut = false,
  animate = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;
  
  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', 
    '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#06B6D4'
  ];

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = (cumulativePercentage * 360) / 100;
          const endAngle = ((cumulativePercentage + percentage) * 360) / 100;
          
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;
          
          const radius = size / 2;
          const innerRadius = donut ? radius * 0.6 : 0;
          
          const x1 = radius + radius * Math.cos(startAngleRad);
          const y1 = radius + radius * Math.sin(startAngleRad);
          const x2 = radius + radius * Math.cos(endAngleRad);
          const y2 = radius + radius * Math.sin(endAngleRad);
          
          const x1Inner = radius + innerRadius * Math.cos(startAngleRad);
          const y1Inner = radius + innerRadius * Math.sin(startAngleRad);
          const x2Inner = radius + innerRadius * Math.cos(endAngleRad);
          const y2Inner = radius + innerRadius * Math.sin(endAngleRad);
          
          const largeArcFlag = percentage > 50 ? 1 : 0;
          
          const pathData = donut
            ? `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} Z`
            : `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
          
          cumulativePercentage += percentage;
          
          return (
            <motion.path
              key={index}
              d={pathData}
              fill={item.color || colors[index % colors.length]}
              initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ transformOrigin: 'center' }}
            />
          );
        })}
      </svg>
      
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color || colors[index % colors.length] }}
            />
            <span className="text-gray-600">{item.label}</span>
            <span className="ml-auto font-medium">{item.value}</span>
            <span className="text-gray-500">({((item.value / total) * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showTrend?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  color = '#3B82F6',
  showTrend = true
}) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  const trend = data[data.length - 1] - data[0];
  
  return (
    <div className="inline-flex items-center gap-2">
      <svg width={width} height={height}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
      {showTrend && (
        <div className={`flex items-center ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
          {trend > 0 ? <TrendingUp className="w-4 h-4" /> : trend < 0 ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
        </div>
      )}
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'from-blue-500 to-blue-600',
  size = 'md',
  animate = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={animate ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};