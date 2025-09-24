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
    'Perlu Verifikasi': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    'Konfirmasi ETLE': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    'Konfirmasi Alamat': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'Dibatalkan': 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300'
  };
  
  // Pastikan untuk menangani kasus di mana status tidak ada di dalam statusClasses
  const finalClasses = statusClasses[status] || 'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300';

  return <span className={`${baseClasses} ${finalClasses}`}>{status}</span>;
}

export default OrderStatusPill;