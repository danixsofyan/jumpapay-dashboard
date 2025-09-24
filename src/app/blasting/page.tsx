import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import BlastingContent from '@/components/blasting-content';

export default function Blasting() {
  return (
    <>
      <MobileHeader />
      <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        <Sidebar />
        <main className="flex-1 bg-white dark:bg-neutral-900 rounded-2xl p-6">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Blasting</h1>
          <BlastingContent />
        </main>
      </div>
    </>
  );
}