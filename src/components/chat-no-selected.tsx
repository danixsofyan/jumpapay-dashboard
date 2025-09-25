// Lokasi: src/components/chat-no-selected.tsx

import Image from 'next/image';
import type { FC } from 'react';

const ChatNoSelected: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <Image
        src="/images/no-message-selected.svg"
        alt="Pesan Belum Dipilih"
        width={300}
        height={300}
        className="mb-6"
      />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Pesan Belum Dipilih
      </h2>
      <p className="text-gray-500 dark:text-neutral-400 max-w-sm">
        Silakan pilih pesan untuk membalas. Pesan yang Anda pilih akan terkunci secara otomatis untuk memudahkan Anda.
      </p>
    </div>
  );
};

export default ChatNoSelected;