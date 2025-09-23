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
    'Sedang Diproses': 'bg-[#E5F2FF] text-[#0071E2]', 
    'Selesai': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', 
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

export default OrderStatusPill;