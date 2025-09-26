"use client";

import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import ChatNoSelected from '@/components/chat-no-selected';
import ChatDetail from '@/components/chat-detail';
import ChatList from '@/components/chat-list';
import { useChatLogic } from '@/hooks/use-chat-logic';

import React, { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ChatPage: FC = () => {
  const {
    activeTab, setActiveTab,
    activeSubTab, setActiveSubTab,
    readMessages, setReadMessages,
    unreadMessages, setUnreadMessages,
    activeSession, setActiveSession,
    closeSession, setCloseSession,
    dateFilter, setDateFilter,
    activeChatId, setActiveChatId,
    searchQuery, setSearchQuery,
    totals,
    availableChats,
    myChats,
    otherChats,
    selectedChat,
    isOtherUserChat,
  } = useChatLogic();

  const handleSessionChange = (value: string, type: 'active' | 'closed') => {
    if (type === 'active') {
      setActiveSession(value === 'active' ? true : null); 
      if (value === 'active') setCloseSession(null);
    } else {
      setCloseSession(value === 'closed' ? true : null);
      if (value === 'closed') setActiveSession(null);
    }
  };

  return (
    <>
      <MobileHeader />
      <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6 h-screen">
        <Sidebar />
        <main className="flex-1 flex gap-6">

          {/* Left Panel : List Chat */}
          <div className={cn(
            "w-full md:w-96 bg-white dark:bg-neutral-900 rounded-2xl p-4 flex flex-col h-full",
            activeChatId !== null ? "hidden md:flex" : "flex"
          )}>
            <div className="flex items-center justify-between py-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto flex items-center gap-2 cursor-pointer text-lg font-bold text-gray-800 dark:text-white dark:hover:bg-transparent">
                    Jumpapay Admin
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-black dark:text-white" align="start">
                  <DropdownMenuLabel>Merchant</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                  <DropdownMenuItem className="py-2 px-4">
                    <div className="flex items-center gap-2">JumpaPay B2C</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4">
                    <div className="flex items-center gap-2">JumpaPay B2B</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dropdown Filter */}
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
                  {/* Message Status */}
                  <DropdownMenuLabel className="font-bold text-gray-800 dark:text-gray-50 text-sm mb-2">Status Pesan</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={readMessages}
                    onCheckedChange={setReadMessages}
                    onSelect={(e) => e.preventDefault()}
                    className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold"
                  >
                    Pesan Terbaca
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={unreadMessages}
                    onCheckedChange={setUnreadMessages}
                    onSelect={(e) => e.preventDefault()}
                    className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold"
                  >
                    Pesan Belum Terbaca
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800 my-2" />

                  {/* Status Session */}
                  <DropdownMenuLabel className="font-bold text-gray-800 dark:text-gray-50 text-sm mb-2">Status Session</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={activeSession === true ? 'active' : closeSession === true ? 'closed' : 'all'} onValueChange={(value) => handleSessionChange(value, value === 'active' ? 'active' : 'closed')}>
                    <DropdownMenuRadioItem value="active" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">Active Session</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="closed" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">Close Session</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>

                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800 my-2" />

                  {/* Chat Date */}
                  <DropdownMenuLabel className="font-bold text-gray-800 dark:text-gray-50 text-sm mb-2">Tanggal Chat</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={dateFilter} onValueChange={setDateFilter}>
                    <DropdownMenuRadioItem value="today" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">Hari Ini</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="yesterday" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">Kemarin</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-week" className="py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:font-semibold">1 Minggu Lalu</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 border dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Tabs */}
            <div className="flex w-full text-sm font-semibold border-b border-gray-200 dark:border-neutral-700">
              <button
                onClick={() => { setActiveTab('belum-diambil'); setActiveSubTab('semua'); }}
                className={cn(
                  "flex items-center justify-center gap-2 pb-3 transition-colors duration-200 flex-1",
                  activeTab === 'belum-diambil'
                    ? "border-b-2 border-primary text-primary -mb-[2px]"
                    : "text-gray-500 dark:text-neutral-400"
                )}
              >
                Belum Diambil <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  activeTab === 'belum-diambil' ? "bg-blue-100 text-primary" : "bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400"
                )}>{totals.available}</span>
              </button>
              <button
                onClick={() => setActiveTab('sudah-diambil')}
                className={cn(
                  "flex items-center justify-center gap-2 pb-3 transition-colors duration-200 flex-1",
                  activeTab === 'sudah-diambil'
                    ? "border-b-2 border-primary text-primary -mb-[2px]"
                    : "text-gray-500 dark:text-neutral-400"
                )}
              >
                Sudah Diambil <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  activeTab === 'sudah-diambil' ? "bg-blue-100 text-primary" : "bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400"
                )}>{totals.taken}</span>
              </button>
            </div>

            {/* Sub-Tabs */}
            {activeTab === 'sudah-diambil' && (
              <div className="flex gap-2 mb-4 text-xs font-medium mt-3">
                <button
                  onClick={() => setActiveSubTab('semua')}
                  className={cn(
                    "px-3 py-1 rounded-lg transition-colors duration-200",
                    activeSubTab === 'semua' ? "bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white" : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  )}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveSubTab('saya')}
                  className={cn(
                    "px-3 py-1 rounded-lg transition-colors duration-200",
                    activeSubTab === 'saya' ? "bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white" : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  )}
                >
                  Diambil Saya
                </button>
                <button
                  onClick={() => setActiveSubTab('lainnya')}
                  className={cn(
                    "px-3 py-1 rounded-lg transition-colors duration-200",
                    activeSubTab === 'lainnya' ? "bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white" : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  )}
                >
                  Diambil Lainnya
                </button>
              </div>
            )}

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto space-y-0 overflow-x-hidden">
              {activeTab === 'belum-diambil' && (
                <ChatList
                  chats={availableChats}
                  groupHeader="Tersedia untuk diambil"
                  activeChatId={activeChatId}
                  setActiveChatId={setActiveChatId}
                />
              )}

              {activeTab === 'sudah-diambil' && activeSubTab === 'semua' && (
                <>
                  <ChatList
                    chats={myChats}
                    groupHeader="Diambil Oleh Saya"
                    activeChatId={activeChatId}
                    setActiveChatId={setActiveChatId}
                  />
                  <ChatList
                    chats={otherChats}
                    groupHeader="Diambil Oleh Lainnya"
                    isPassive={true}
                    activeChatId={activeChatId}
                    setActiveChatId={setActiveChatId}
                  />
                </>
              )}

              {activeTab === 'sudah-diambil' && activeSubTab === 'saya' && (
                <ChatList
                  chats={myChats}
                  groupHeader="Diambil Oleh Saya"
                  activeChatId={activeChatId}
                  setActiveChatId={setActiveChatId}
                />
              )}
              {activeTab === 'sudah-diambil' && activeSubTab === 'lainnya' && (
                <ChatList
                  chats={otherChats}
                  groupHeader="Diambil Oleh Lainnya"
                  isPassive={true}
                  activeChatId={activeChatId}
                  setActiveChatId={setActiveChatId}
                />
              )}
            </div>
          </div>

          {/* Right Panel: Chat Details */}
          <div className={cn(
            "flex-1 items-center justify-center bg-white dark:bg-neutral-900 rounded-2xl p-6",
            activeChatId !== null ? "flex" : "hidden md:flex"
          )}>
            {selectedChat ? (
              <ChatDetail 
                chat={selectedChat}
                isReadOnly={isOtherUserChat}
                onCloseDetail={() => setActiveChatId(null)} 
              />
            ) : (
              <ChatNoSelected />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatPage;