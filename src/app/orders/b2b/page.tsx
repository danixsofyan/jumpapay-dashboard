import MobileHeader from '@/components/mobile-header';
import OrderB2B from '@/components/order-b2b';
import Sidebar from '@/components/sidebar';
import b2bData from '@/data/data-b2b.json';

export default function B2BPage() {
  return (
    <>
      <MobileHeader />
      <div className="bg-gray-100 dark:bg-neutral-950 min-h-screen">
        <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <main className="w-full bg-white dark:bg-neutral-900 rounded-2xl p-6">
            <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">Order B2B</h1>
            <OrderB2B
              data={{
                ...b2bData,
                orders: b2bData.orders.map((order) => ({
                  ...order,
                  status_pembayaran: order.status_b2b as
                    | "Belum Bayar"
                    | "Sudah Bayar"
                    | "Sedang Diproses"
                    | "Selesai",
                })),
              }}
            />
          </main>
        </div>
      </div>
    </>
  );
}