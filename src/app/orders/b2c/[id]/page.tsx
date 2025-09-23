import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import OrderDetail from '@/components/order-detail';
import b2cData from '@/data/data-b2c.json';
import React from 'react';

interface DetailOrderPageProps {
  params: {
    id: string;
  };
}

export default function DetailOrderPage({ params }: DetailOrderPageProps) {
  const { id } = React.use(Promise.resolve(params));
  const order = b2cData.orders.find(o => o.id.toString() === id);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-950">
        <p className="text-xl text-gray-700 dark:text-neutral-300">Order tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <MobileHeader />
      <div className="bg-gray-100 dark:bg-neutral-950 min-h-screen">
        <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <main className="w-full">
              <OrderDetail
                  order={{
                      ...order,
                      status_pembayaran: order.status_pembayaran as
                      | "Belum Bayar"
                      | "Sudah Bayar"
                      | "Sedang Diproses"
                      | "Selesai",
                  }}
                  title="Detail Order B2C"
              />
          </main>
        </div>
      </div>
    </>
  );
}