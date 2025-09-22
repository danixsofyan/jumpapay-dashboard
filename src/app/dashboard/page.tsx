import Sidebar from '@/components/sidebar';
import StatCard from '@/components/stat-card';
import OrderHistoryChart from '@/components/order-history-chart';
import TopListCard from '@/components/top-list-card';
import RecentOrders from '@/components/recent-orders';
import OngoingPromo from '@/components/ongoing-promo';
import MobileHeader from '@/components/mobile-header';

import topSkuData from "@/data/data-top-sku.json";
import topCourierData from "@/data/data-top-kurir.json";
import ongoingPromoData from "@/data/data-ongoing-promo.json";
import ordersData from "@/data/data-recent-order.json";
import statCardsData from "@/data/data-stat-cards.json";
import orderHistoryData from "@/data/data-order-history.json";

export default function Dashboard() {
  return (
    <>
      <MobileHeader />
      <div className="p-4 lg:p-6">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 bg-white dark:bg-neutral-900 rounded-2xl p-6">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="lg:col-span-2">
                <StatCard
                  title={statCardsData[0].title}
                  value={statCardsData[0].value}
                  icon={statCardsData[0].icon}
                />
              </div>
              <StatCard
                title={statCardsData[1].title}
                value={statCardsData[1].value}
                icon={statCardsData[1].icon}
              />
              <StatCard
                title={statCardsData[2].title}
                value={statCardsData[2].value}
                icon={statCardsData[2].icon}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <OrderHistoryChart data={orderHistoryData} />
                <RecentOrders title="Order Hari Ini" data={ordersData}/>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <TopListCard title="Top SKU" data={topSkuData} />
                <TopListCard title="Top Kurir" data={topCourierData} />
                <OngoingPromo title="Ongoing Promo" data={ongoingPromoData}/>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}