"use client";

import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import ChatNoSelected from '@/components/chat-no-selected';
import React, { useState, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ChatPage: FC = () => {
  const [activeTab, setActiveTab] = useState('belum diambil');
  const [readMessages, setReadMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [activeSession, setActiveSession] = useState('all');
  const [closeSession, setCloseSession] = useState(false);
  const [dateFilter, setDateFilter] = useState('today');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const chatUsers = [
    { id: 1, name: 'Rania Anjani', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 4, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Talita Putri', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Veni Rahayu', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Liana Ristiawati', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Rani Saputra', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Putri Dwi', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Angga Wijaya', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Sinta Larasati', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.44 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'Budi Hartono', message: 'Bagaimana cara cek status pesanan?', time: '11.40 WIB', unread: 2, avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 10, name: 'Citra Dewi', message: 'Apakah bisa ganti alamat pengiriman?', time: '11.35 WIB', unread: 0, avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: 11, name: 'Doni Pratama', message: 'Saya butuh bantuan untuk login.', time: '11.30 WIB', unread: 3, avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 12, name: 'Eva Lestari', message: 'Apakah ada promo bulan ini?', time: '11.25 WIB', unread: 0, avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 13, name: 'Fandi Ahmad', message: 'Pesanan saya kapan sampai ya?', time: '11.20 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 14, name: 'Gita Sanjaya', message: 'Terima kasih atas bantuannya!', time: '11.15 WIB', unread: 0, avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 15, name: 'Hani Wijaya', message: 'Ada kendala saat pembayaran.', time: '11.10 WIB', unread: 5, avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 16, name: 'Ivan Permana', message: 'Bagaimana cara menghubungi admin?', time: '11.05 WIB', unread: 0, avatar: 'https://i.pravatar.cc/150?img=16' },
    { id: 17, name: 'Joko Susilo', message: 'Halo, apakah ini dengan Jumpapay?', time: '11.00 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=17' },
    { id: 18, name: 'Kartika Sari', message: 'Sudah saya bayar, mohon dicek.', time: '11.00 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=18' },
    { id: 19, name: 'Lia Fitriani', message: 'Terima kasih banyak!', time: '11.00 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=19' },
    { id: 20, name: 'Miko Wijaya', message: 'Saya ingin bertanya tentang produk.', time: '11.00 WIB', unread: 1, avatar: 'https://i.pravatar.cc/150?img=20' },
  ];

  return (
    <>
      <MobileHeader />
      <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6 h-screen">
        <Sidebar />
        <main className="flex-1 flex gap-6">
          
          {/* Panel Kiri: Daftar Chat */}
          <div className="w-full md:w-96 bg-white dark:bg-neutral-900 rounded-2xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between py-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto flex items-center gap-2 cursor-pointer text-lg font-bold text-gray-800 dark:text-white dark:hover:bg-transparent">
                    Jumpapay Admin
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-black dark:text-white" align="start">
                  <DropdownMenuLabel className='text-sm text-gray-400'>Ganti Whatsapp</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                  <DropdownMenuItem className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <Image src="/images/logo-jumpapay.svg" alt='logo jumpapay' width={20} height={20} />
                        JumpaPay B2C
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <Image src="/images/logo-jumpapay.svg" alt='logo jumpapay' width={20} height={20} />
                        JumpaPay B2B
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Filter <Filter className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-gray-700 dark:text-gray-200 rounded-lg" align="end">
                  <DropdownMenuLabel className="text-gray-400 dark:text-gray-50 text-sm mb-2">Status Pesan</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked={readMessages} onCheckedChange={setReadMessages} className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                    Pesan Terbaca
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={unreadMessages} onCheckedChange={setUnreadMessages} className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                    Pesan Belum Terbaca
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800 my-2" />
                  
                  <DropdownMenuLabel className="text-gray-400 dark:text-gray-50 text-sm mb-2">Status Session</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked={activeSession} onCheckedChange={setActiveSession} className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                    Active Session
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={closeSession} onCheckedChange={setCloseSession} className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                    Close Session
                  </DropdownMenuCheckboxItem>
                  
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800 my-2" />
                  
                  <DropdownMenuLabel className="text-gray-400 dark:text-gray-50 text-sm mb-2">Tanggal Chat</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={dateFilter} onValueChange={setDateFilter}>
                    <DropdownMenuRadioItem value="today" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                      Hari Ini
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="yesterday" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                      Kemarin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-week" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">
                      1 Minggu Lalu
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari"
                className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 border dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex gap-4 mb-4 text-sm font-semibold border-b border-gray-200 dark:border-neutral-700">
              <button 
                onClick={() => setActiveTab('belum diambil')}
                className={cn(
                  "flex items-center gap-2 pb-3 transition-colors duration-200",
                  activeTab === 'belum diambil'
                    ? "border-b-2 border-primary text-primary -mb-[2px]"
                    : "text-gray-500 dark:text-neutral-400"
                )}
              >
                Belum Diambil <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  activeTab === 'belum diambil' ? "bg-blue-100 text-primary" : "bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400"
                )}>{activeTab === 'belum diambil' ? 4 : 4}</span>
              </button>
              <button 
                onClick={() => setActiveTab('sudah diambil')}
                className={cn(
                  "flex items-center gap-2 pb-3 transition-colors duration-200",
                  activeTab === 'sudah diambil'
                    ? "border-b-2 border-primary text-primary -mb-[2px]"
                    : "text-gray-500 dark:text-neutral-400"
                )}
              >
                Sudah Diambil <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  activeTab === 'sudah diambil' ? "bg-blue-100 text-primary" : "bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400"
                )}>{activeTab === 'sudah diambil' ? 16 : 16}</span>
              </button>
            </div>
            
            {/* Daftar Chat */}
            <div className="flex-1 overflow-y-auto space-y-0 overflow-x-hidden">
              {chatUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  onClick={() => setActiveChatId(user.id)}
                  className={cn(
                    "flex items-center p-3 cursor-pointer transition-colors duration-150",
                    index < chatUsers.length - 1 ? "border-b border-gray-100 dark:border-neutral-800" : "",
                    activeChatId === user.id ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-100 dark:hover:bg-neutral-800/50"
                  )}
                >
                  <Image src={user.avatar} alt={user.name} width={48} height={48} className="rounded-full mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400 truncate">{user.message}</p>
                  </div>
                  <div className="flex flex-col items-end pl-2 flex-shrink-0 w-16">
                    <p className="text-xs text-gray-400 mb-1">{user.time}</p>
                    {user.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel Kanan: Detail Chat */}
          <div className="hidden md:flex flex-1 items-center justify-center bg-white dark:bg-neutral-900 rounded-2xl p-6">
            <ChatNoSelected />
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatPage;