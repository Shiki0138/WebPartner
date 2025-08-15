import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, item: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  selectable?: boolean;
  selectedRows?: number[];
  onSelectRow?: (index: number) => void;
  onSelectAll?: () => void;
  actions?: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  hover?: boolean;
  striped?: boolean;
  compact?: boolean;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  sortBy,
  sortOrder = 'asc',
  onSort,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  actions,
  emptyMessage = 'データがありません',
  hover = true,
  striped = false,
  compact = false
}: TableProps<T>) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const allSelected = selectedRows.length === data.length && data.length > 0;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable || !onSort) return null;

    const isActive = sortBy === column.key;
    
    return (
      <button
        onClick={() => onSort(column.key as string)}
        className="ml-1 text-gray-400 hover:text-gray-600"
      >
        {isActive ? (
          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronsUpDown className="w-4 h-4" />
        )}
      </button>
    );
  };

  const getCellValue = (item: T, column: Column<T>) => {
    const keys = (column.key as string).split('.');
    return keys.reduce((obj, key) => obj?.[key], item as any);
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className={`${compact ? 'px-4 py-2' : 'px-6 py-3'} w-12`}>
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`
                    ${compact ? 'px-4 py-2' : 'px-6 py-3'}
                    ${alignClasses[column.align || 'left']}
                    text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.width || ''}
                  `}
                >
                  <div className={`flex items-center ${column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : ''}`}>
                    {column.header}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
              {actions && (
                <th className={`${compact ? 'px-4 py-2' : 'px-6 py-3'} w-20`}>
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="px-6 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-500">読み込み中...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    ${hover ? 'hover:bg-gray-50' : ''}
                    ${striped && index % 2 === 1 ? 'bg-gray-50' : ''}
                    ${selectedRows.includes(index) ? 'bg-blue-50' : ''}
                    transition-colors
                  `}
                >
                  {selectable && (
                    <td className={`${compact ? 'px-4 py-2' : 'px-6 py-4'}`}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => onSelectRow?.(index)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key as string}
                      className={`
                        ${compact ? 'px-4 py-2' : 'px-6 py-4'}
                        ${alignClasses[column.align || 'left']}
                        text-sm text-gray-900
                      `}
                    >
                      {column.render 
                        ? column.render(getCellValue(item, column), item, index)
                        : getCellValue(item, column)
                      }
                    </td>
                  ))}
                  {actions && (
                    <td className={`${compact ? 'px-4 py-2' : 'px-6 py-4'} text-right`}>
                      {actions(item, index)}
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TableActionProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const TableAction: React.FC<TableActionProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'text-gray-600 hover:text-gray-900',
    danger: 'text-red-600 hover:text-red-900'
  };

  return (
    <button
      onClick={onClick}
      className={`p-1 rounded transition-colors ${variantClasses[variant]}`}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange?: (items: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`
            px-3 py-1 text-sm border rounded transition-colors
            ${i === currentPage 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'hover:bg-gray-50'
            }
          `}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="px-2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {startItem}-{endItem} / {totalItems}件
        </span>
        {onItemsPerPageChange && (
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value={10}>10件</option>
            <option value={25}>25件</option>
            <option value={50}>50件</option>
            <option value={100}>100件</option>
          </select>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          前へ
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次へ
        </button>
      </div>
    </div>
  );
};