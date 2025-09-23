'use client';

import { useState } from 'react';
import type { FC } from 'react';
import type { Order, OrderStatus } from '@/types/order-types';
import OrderTableFilters from './order-table-filters';
import OrderTableRow from './order-table-row';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Belum Bayar');
  
  const TABS = ['Belum Bayar', 'Sedang Diproses', 'Selesai'];
  const statusMap: { [key: string]: OrderStatus[] } = {
    'Belum Bayar': ['Belum Bayar'],
    'Sedang Diproses': ['Diproses', 'Sudah Bayar'],
    'Selesai': ['Selesai'],
  };

  const safeOrders = orders || [];
  const filteredOrders = safeOrders.filter(order => {
    const validStatuses = statusMap[activeTab];
    return validStatuses ? validStatuses.includes(order.status_pembayaran) : false;
  });

  return (
    <div className="bg-white dark:bg-neutral-800/50 p-6 rounded-xl border border-gray-200 dark:border-neutral-700/50">
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

      <OrderTableFilters />

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-neutral-400">
          <thead className="text-xs text-gray-700 dark:text-neutral-300 bg-gray-50 dark:bg-neutral-800">
            <tr>
              {['Tanggal', 'Nama', 'Layanan', 'No. HP', 'Kota', 'Status Pembayaran', 'Platform', 'Harga', 'Aksi'].map(header => (
                <th key={header} scope="col" className="px-6 py-3 font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <OrderTableRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
