import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';

export default function Favorites() {
  return (
    <>
      <MobileHeader />
      <div className="p-4 lg:p-6">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 bg-white dark:bg-neutral-800 rounded-2xl p-6">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Favorites</h1>
          </main>
        </div>
      </div>
    </>
  );
}