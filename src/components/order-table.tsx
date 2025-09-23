'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import type { Order, OrderStatus } from '@/types/order-types';
import OrderTableFilters from './order-table-filters';
import OrderTableRow from './order-table-row';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Belum Bayar');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  const TABS = ['Belum Bayar', 'Sedang Diproses', 'Selesai'];
  const statusMap: { [key: string]: OrderStatus[] } = {
    'Belum Bayar': ['Belum Bayar'],
    'Sedang Diproses': ['Sedang Diproses', 'Sudah Bayar'],
    'Selesai': ['Selesai'],
  };

  const safeOrders = orders || [];
  
  const filteredOrders = safeOrders
    .filter(order => {
        const query = searchQuery.toLowerCase();
        return (
            order.nama.toLowerCase().includes(query) ||
            order.layanan.toLowerCase().includes(query) ||
            order.no_hp.toLowerCase().includes(query) ||
            order.kota.toLowerCase().includes(query) ||
            order.platform.toLowerCase().includes(query)
        );
    })
    .filter(order => {
        const validStatuses = statusMap[activeTab];
        return validStatuses ? validStatuses.includes(order.status_pembayaran) : false;
    });

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleExport = useCallback((format: 'csv' | 'pdf') => {
    if (!filteredOrders || filteredOrders.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

    const headers = [
      "Tanggal", "Nama", "Layanan", "No. HP", "Kota", 
      "Status Pembayaran", "Platform", "Harga"
    ];

    const data = filteredOrders.map(order => [
      order.tanggal,
      order.nama,
      order.layanan,
      order.no_hp,
      order.kota,
      order.status_pembayaran,
      order.platform,
      order.harga,
    ]);

    if (format === 'csv') {
      const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + data.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "data-pesanan.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Laporan Data Pesanan", 14, 22);
      
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 30,
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [30, 41, 59],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        theme: 'striped',
      });
      
      doc.save("data-pesanan.pdf");
    }
  }, [filteredOrders]);


  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= half + 1) {
        for (let i = 1; i <= maxVisible - 1; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - half) {
        pages.push(1, '...');
        for (let i = totalPages - (maxVisible - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, '...');
        for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-200 dark:border-neutral-700/50">
      <div className="p-6">
        <div className="flex border-b border-gray-200 dark:border-neutral-700">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-[183.33px] h-[50px] py-4 flex items-center justify-center text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'border-b border-primary text-primary'
                  : 'border-b border-transparent text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <OrderTableFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExport={handleExport}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-neutral-400 table-fixed">
          <thead className="text-xs text-gray-700 dark:text-neutral-300 bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-2 py-3 font-semibold sm:px-6">
                <span className="hidden sm:inline">Tanggal</span>
                <span className="sm:hidden">Tgl.</span>
              </th>
              <th scope="col" className="px-2 py-3 font-semibold sm:px-6">Nama</th>
              <th scope="col" className="px-2 py-3 font-semibold sm:px-6">Layanan</th>
              <th scope="col" className="px-6 py-3 font-semibold hidden md:table-cell">No. HP</th>
              <th scope="col" className="px-6 py-3 font-semibold hidden md:table-cell">Kota</th>
              <th scope="col" className="px-6 py-3 font-semibold hidden md:table-cell">Status Pembayaran</th>
              <th scope="col" className="px-6 py-3 font-semibold hidden md:table-cell">Platform</th>
              <th scope="col" className="px-6 py-3 font-semibold hidden md:table-cell">Harga</th>
              <th scope="col" className="px-2 py-3 font-semibold sm:px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map(order => (
              <OrderTableRow key={order.id} order={order} />
            ))}
            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500 dark:text-neutral-400">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="text-sm text-gray-500 dark:text-neutral-400">Baris per halaman</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="w-[110px] h-[36px] appearance-none cursor-pointer rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 pl-4 pr-8 text-xs font-semibold text-gray-800 dark:text-white"
                >
                  <option value={5}>5 Baris</option>
                  <option value={10}>10 Baris</option>
                  <option value={20}>20 Baris</option>
                  <option value={50}>50 Baris</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-neutral-400">
                {startIndex + 1}-{endIndex} dari {totalItems} data
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                {visiblePages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={typeof page !== 'number'}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                      typeof page === 'number'
                        ? currentPage === page
                          ? 'bg-blue-100 text-primary dark:bg-blue-900/50 dark:text-white'
                          : 'bg-white text-gray-800 dark:bg-neutral-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700'
                        : 'cursor-default text-gray-500 dark:text-neutral-400'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;