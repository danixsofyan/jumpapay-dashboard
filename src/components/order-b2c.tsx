'use client';

import type { FC } from 'react';
import StatCard from '@/components/stat-card';
import TopListCard from '@/components/top-list-card';
import OrderTable from '@/components/order-table';
import type { Order as OrderType } from '@/types/order-types';

interface Stat { id: string; label: string; value: string; icon: string; }
interface OrderListItem { label: string; value: string; }
interface LocalOrder {
    id: number;
    tanggal: string;
    nama: string;
    layanan: string;
    no_hp: string;
    kota: string;
    status_pembayaran: 'Belum Bayar' | 'Sudah Bayar' | 'Sedang Diproses' | 'Selesai';
    platform: string;
    harga: string;
}

interface OrderB2CProps { data: { summary_stats: Stat[]; list_order: OrderListItem[]; orders: LocalOrder[]; }; }

const OrderB2C: FC<OrderB2CProps> = ({ data }) => {
  const listOrderData = (data?.list_order || []).map(item => ({
    name: item.label,
    value: item.value,
  }));

  // Map the local orders and add the required 'variant' property
  const formattedOrders = (data?.orders || []).map(order => ({
    ...order,
    variant: 'b2c',
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data?.summary_stats || []).map(stat => (
            <StatCard
              key={stat.id}
              title={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
        
        <TopListCard 
          title="List Order" 
          data={listOrderData}
          showDatePicker={false} 
        />
      </div>

      <OrderTable orders={formattedOrders as OrderType[]} variant="b2c" />
    </div>
  );
};

export default OrderB2C;