"use client"

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import menuItems from "@/data/sidebar-menu.json";

const MobileHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentMenuItem = menuItems.find(item => item.href === pathname);
  const title = currentMenuItem ? currentMenuItem.label : 'Menu';

  return (
    <header className="flex lg:hidden items-center justify-between p-4 bg-white dark:bg-black border-b dark:border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="dark:text-white dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="dark:text-white dark:hover:bg-zinc-900">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900 border dark:border-zinc-800">
          <DropdownMenuItem className="dark:text-white dark:hover:bg-zinc-800">Pengaturan</DropdownMenuItem>
          <DropdownMenuItem className="dark:text-white dark:hover:bg-zinc-800">Bantuan</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hamburger menu (opsional) */}
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar /> // Sidebar yang sudah ada, tapi sebagai menu hamburger
        </SheetContent>
      </Sheet> */}
    </header>
  );
};

export default MobileHeader;