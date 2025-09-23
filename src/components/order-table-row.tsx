import type { FC } from 'react';
import { Check, Eye } from 'lucide-react';
import type { Order } from '@/types/order-types';
import OrderStatusPill from './order-status-pill';
import Link from 'next/link';

interface OrderTableRowProps {
  order: Order;
}

const OrderTableRow: FC<OrderTableRowProps> = ({ order }) => {
  return (
    <tr className="bg-white dark:bg-transparent border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
      <td className="px-2 py-4 w-1/4 sm:px-6">{order.tanggal}</td>
      <td className="px-2 py-4 w-1/4 sm:px-6 font-semibold text-gray-900 dark:text-white truncate">{order.nama}</td>
      <td className="px-2 py-4 w-1/4 sm:px-6 truncate">{order.layanan}</td>
      <td className="px-6 py-4 hidden md:table-cell">{order.no_hp}</td>
      <td className="px-6 py-4 hidden md:table-cell">{order.kota}</td>
      <td className="px-6 py-4 hidden md:table-cell"><OrderStatusPill status={order.status_pembayaran} /></td>
      <td className="px-6 py-4 hidden md:table-cell">{order.platform}</td>
      <td className="px-6 py-4 hidden md:table-cell font-semibold text-gray-900 dark:text-white">{order.harga}</td>
      <td className="px-2 py-4 w-1/4 sm:px-6">
        <div className="flex items-center justify-center gap-2">
          <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-white bg-primary rounded-lg hover:opacity-90 ">
            <Check className="w-5 h-5" />
          </button>
          <Link href={`/orders/b2c/${order.id}`}>
            <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600">
              <Eye className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;