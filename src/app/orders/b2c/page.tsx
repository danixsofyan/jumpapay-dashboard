import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import OrderB2C from '@/components/order-b2c';
import b2cData from '@/data/data-b2c.json';

export default function B2CPage() {
  return (
    <>
      <MobileHeader />
      <div className="bg-gray-100 dark:bg-neutral-950 min-h-screen">
        <div className="p-4 lg:p-6">
          <div className="flex gap-6">
            <Sidebar />
            <main className="flex-1 bg-white dark:bg-neutral-900 rounded-2xl p-6">
              <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">Order B2C</h1>
              <OrderB2C
                data={{
                  ...b2cData,
                  orders: b2cData.orders.map((order) => ({
                    ...order,
                    status_pembayaran: order.status_pembayaran as
                      | "Belum Bayar"
                      | "Sudah Bayar"
                      | "Diproses"
                      | "Selesai",
                  })),
                }}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
