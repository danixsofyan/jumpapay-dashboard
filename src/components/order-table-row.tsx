import type { FC } from 'react';
import { Check, ChevronRight, Eye, Pencil } from 'lucide-react';
import type { Order } from '@/types/order-types';
import OrderStatusPill from './order-status-pill';
import Link from 'next/link';

interface OrderTableRowProps {
  order: Order;
  variant: 'b2c' | 'b2b';
}

const OrderTableRow: FC<OrderTableRowProps> = ({ order, variant }) => {
  const isB2B = variant === 'b2b';
  const detailLink = `/orders/${variant}/${order.id}`;

  const renderActions = () => {
    if (isB2B) {
      return (
        <>
          <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-white bg-primary rounded-lg hover:opacity-90">
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600">
            <Pencil className="w-5 h-5" />
          </button>
          <Link href={detailLink}>
            <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600">
              <Eye className="w-5 h-5" />
            </button>
          </Link>
        </>
      );
    }
    
    return (
      <>
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-white bg-primary rounded-lg hover:opacity-90">
          <Check className="w-5 h-5" />
        </button>
        <Link href={detailLink}>
          <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600">
            <Eye className="w-5 h-5" />
          </button>
        </Link>
      </>
    );
  };

  return (
    <tr className="bg-white dark:bg-transparent border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
      {isB2B ? (
        <>
          <td className="px-2 py-4 sm:px-6 hidden sm:table-cell">
            <input type="checkbox" className="h-4 w-4 rounded-sm border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-primary focus:ring-primary" />
          </td>
          <td className="px-2 py-4 sm:px-6 whitespace-nowrap">{order.tanggal}</td>
          <td className="px-2 py-4 sm:px-6 font-semibold text-gray-900 dark:text-white">{order.nama}</td>
          <td className="px-2 py-4 sm:px-6 sm:table-cell">{order.layanan}</td>
          <td className="px-6 py-4 hidden lg:table-cell">{order.no_hp}</td>
          <td className="px-6 py-4 hidden lg:table-cell">{order.kota}</td>
          <td className="px-6 py-4 hidden xl:table-cell">{order.platform}</td>
          <td className="px-6 py-4 hidden xl:table-cell font-semibold text-gray-900 dark:text-white">{order.harga}</td>
          <td className="px-6 py-4 hidden xl:table-cell">
            <OrderStatusPill status={order.status_b2b} />
          </td>
        </>
      ) : (
        <>
          <td className="px-2 py-4 sm:px-6 whitespace-nowrap">{order.tanggal}</td>
          <td className="px-2 py-4 sm:px-6 font-semibold text-gray-900 dark:text-white">{order.nama}</td>
          <td className="px-2 py-4 sm:px-6">{order.layanan}</td>
          <td className="px-6 py-4 hidden md:table-cell">{order.no_hp}</td>
          <td className="px-6 py-4 hidden md:table-cell">{order.kota}</td>
          <td className="px-6 py-4 hidden md:table-cell">
            <OrderStatusPill status={order.status_pembayaran} />
          </td>
          <td className="px-6 py-4 hidden md:table-cell">{order.platform}</td>
          <td className="px-6 py-4 hidden md:table-cell font-semibold text-gray-900 dark:text-white">{order.harga}</td>
        </>
      )}
      <td className="px-2 py-4 sm:px-6">
        <div className="flex items-center justify-center gap-2">
          {renderActions()}
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;