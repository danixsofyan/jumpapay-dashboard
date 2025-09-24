"use client"

import * as React from "react"
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, RefreshCw } from "lucide-react"

import menuItems from "@/data/sidebar-menu.json";
import UserNav from './user-nav';
import { useTheme } from "next-themes";

interface MenuItem {
  id: string;
  icon: string;
  iconActive?: string;
  label: string;
  href: string;
}

const merchants = [
  { id: "jumpapay", name: "Jumpapay", logoUrl: "/images/logo-jumpapay.svg", logoDarkUrl: "/images/logo-jumpapay.svg" },
  { id: "gamaloka", name: "Gamaloka", logoUrl: "/images/logo-gamaloka.png", logoDarkUrl: "/images/logo-gamaloka.png" },
];

const orderTypes = [
  { id: "b2c", name: "B2C", href: "/orders/b2c" },
  { id: "b2b", name: "B2B", href: "/orders/b2b" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [merchantPopoverOpen, setMerchantPopoverOpen] = React.useState(false);
  const [ordersPopoverOpen, setOrdersPopoverOpen] = React.useState(false);

  const [selectedMerchant, setSelectedMerchant] = React.useState(merchants[0]);
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? "/images/logo-jumpapay.svg" : "/images/logo-jumpapay.svg";

  return (
    <aside className="hidden lg:flex bg-white dark:bg-black w-24 p-6 flex-col items-center rounded-2xl sticky top-6 h-[calc(100vh-3rem)]">
      
      <div className="mb-12">
        <Image alt="Main Logo" height={41} src={logoSrc} width={48} />
      </div>

      <nav className="flex flex-col items-center gap-6 flex-1">
        {menuItems.map((item: MenuItem) => {
          if (item.id === 'switch') {
            return (
              <Popover key={item.id} open={merchantPopoverOpen} onOpenChange={setMerchantPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-lg text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-zinc-900"
                  >
                    <Icon icon={item.icon} className="size-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-4 bg-white dark:bg-zinc-900 border-none text-black dark:text-white" side="right" align="start">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-sky-100 dark:bg-sky-900 p-2 rounded-xs">
                      <RefreshCw className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <p className="font-bold text-xs">Change Merchant</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {merchants.map((merchant) => (
                      <Button
                        key={merchant.id}
                        variant="ghost"
                        onClick={() => {
                          setSelectedMerchant(merchant);
                          setMerchantPopoverOpen(false);
                        }}
                        className="w-full justify-start gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-gray-200"
                      >
                        <Image src={theme === 'dark' && merchant.logoDarkUrl ? merchant.logoDarkUrl : merchant.logoUrl} alt={merchant.name} width={20} height={20} />
                        {merchant.name}
                        <Check className={cn("ml-auto h-4 w-4", selectedMerchant.id === merchant.id ? "opacity-100" : "opacity-0")} />
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }
          
          if (item.id === 'orders') {
            return (
              <Popover key={item.id} open={ordersPopoverOpen} onOpenChange={setOrdersPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn("h-12 w-12 rounded-lg", pathname.startsWith(item.href) ? "bg-[#E0F6FF] text-[#69C5EB] hover:bg-[#d0f1fe] hover:text-[#69C5EB] dark:bg-zinc-900 dark:text-[#69C5EB] dark:hover:bg-zinc-800" : "text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-zinc-900")}
                  >
                    <Icon icon={item.icon} className="size-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-4 bg-white dark:bg-zinc-900 border-none text-black dark:text-white" side="right" align="start">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon="tabler:checklist" className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    <p className="font-bold text-xs">Orders</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {orderTypes.map((orderType) => (
                      <Button
                        key={orderType.id}
                        variant="ghost"
                        asChild
                        className="w-full justify-start gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-gray-200"
                      >
                        <Link href={orderType.href} onClick={() => setOrdersPopoverOpen(false)}>
                          {orderType.name}
                          <Check className={cn("ml-auto h-4 w-4", pathname.startsWith(orderType.href) ? "opacity-100" : "opacity-0")} />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          const isActive = pathname === item.href;
          const currentIcon = isActive && item.iconActive ? item.iconActive : item.icon;
          return (
            <Button asChild key={item.id} variant="ghost" className={cn("h-12 w-12 rounded-lg", isActive ? "bg-[#E0F6FF] text-[#69C5EB] hover:bg-[#d0f1fe] hover:text-[#69C5EB] dark:bg-zinc-900 dark:text-[#69C5EB] dark:hover:bg-zinc-800" : "text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-zinc-900")}>
              <Link href={item.href}>
                <Icon icon={currentIcon} className="size-6" />
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <UserNav />
      </div>
    </aside>
  );
};

export default Sidebar;