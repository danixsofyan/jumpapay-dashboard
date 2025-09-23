import type { FC } from 'react';
import type { OrderStatus } from '@/types/order-types';

interface OrderStatusPillProps {
  status: OrderStatus;
}

const OrderStatusPill: FC<OrderStatusPillProps> = ({ status }) => {
  const baseClasses = "w-[137px] h-[26px] inline-flex items-center justify-center text-xs font-medium rounded-[4px]";
  const statusClasses = { 
    'Belum Bayar': 'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300', 
    'Sudah Bayar': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', 
    'Diproses': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', 
    'Selesai': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', 
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

export default OrderStatusPill;