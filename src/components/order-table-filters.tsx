'use client';

import type { FC } from 'react';
import { Download, FileSpreadsheetIcon, FileTextIcon, Search, Upload } from 'lucide-react';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrderTableFiltersProps {
searchQuery: string;
setSearchQuery: (query: string) => void;
onExport: (format: 'csv' | 'pdf') => void;
}

const OrderTableFilters: FC<OrderTableFiltersProps> = ({ searchQuery, setSearchQuery, onExport }) => {
  return (
  <>
    <div className="flex flex-wrap gap-4 items-center justify-between pt-6">
      <div className="relative flex-grow sm:flex-grow-0">
        <input type="text" placeholder="Find" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}
        className="pl-4 pr-10 py-2 w-full sm:w-64 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 font-semibold cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={()=> onExport('csv')}>
            <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> onExport('pdf')}>
            <FileTextIcon className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>

    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end py-5">
      <div className="space-y-1 sm:col-span-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pilih Bulan</label>
        <select
          className="w-full text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none h-[40px]">
          <option>Januari</option>
          <option>Februari</option>
        </select>
      </div>
      <div className="space-y-1 sm:col-span-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pilih Tahun</label>
        <select
          className="w-full text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none h-[40px]">
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>
      <div className="sm:col-span-1 flex justify-end">
        <button
          className="w-full sm:w-[100px] h-[40px] flex items-center justify-center text-sm px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 cursor-pointer">
          Cari
        </button>
      </div>
    </div>
  </>
  );
  }

  export default OrderTableFilters;