"use client"

import * as React from "react"
import { usePathname } from 'next/navigation';
import { Check, ChevronRight, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import menuItems from "@/data/sidebar-menu.json";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from "next-themes";

const merchants = [
  { id: "jumpapay", name: "Jumpapay", logoUrl: "/images/logo-jumpapay.svg", logoDarkUrl: "/images/logo-jumpapay.svg" },
  { id: "gamaloka", name: "Gamaloka", logoUrl: "/images/logo-gamaloka.png", logoDarkUrl: "/images/logo-gamaloka.png" },
];

const orderTypes = [
  { id: "b2c", name: "B2C", href: "/orders/b2c" },
  { id: "b2b", name: "B2B", href: "/orders/b2b" },
];

const MobileHeader = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [selectedMerchant, setSelectedMerchant] = React.useState(merchants[0]);
  const [isOrdersOpen, setIsOrdersOpen] = React.useState(false);
  const [isSwitchOpen, setIsSwitchOpen] = React.useState(false);

  const logoSrc = theme === 'dark' ? "/images/logo-jumpapay-primary.svg" : "/images/logo-jumpapay-primary.svg";

  return (
    <header className="flex lg:hidden items-center justify-between p-4 bg-white dark:bg-black border-b dark:border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Image alt="Main Logo" src={logoSrc} height={10} width={150} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="dark:text-white dark:hover:bg-zinc-900">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border dark:border-zinc-800 text-black dark:text-white">         
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            if (item.id === 'orders') {
              return (
                <React.Fragment key={item.id}>
                  <DropdownMenuItem
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 ${isActive ? 'bg-[#E0F6FF] text-[#69C5EB]' : ''}`}
                    onSelect={(e) => { e.preventDefault(); setIsOrdersOpen(!isOrdersOpen); }} // Prevent close on select
                  >
                    <Icon icon={item.icon} className="size-5 mr-2" />
                    <span>{item.label}</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isOrdersOpen ? 'rotate-90' : ''}`} />
                  </DropdownMenuItem>
                  {isOrdersOpen && (
                    <div className="pl-6">
                      {orderTypes.map((orderType) => (
                        <DropdownMenuItem key={orderType.id} asChild>
                          <Link href={orderType.href} className="flex items-center gap-2">
                            <span className="ml-2">{orderType.name}</span>
                            <Check className={`ml-auto h-4 w-4 ${pathname.startsWith(orderType.href) ? "opacity-100" : "opacity-0"}`} />
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            }
            
            if (item.id === 'switch') {
              return (
                <React.Fragment key={item.id}>
                  <DropdownMenuItem
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800`}
                    onSelect={(e) => { e.preventDefault(); setIsSwitchOpen(!isSwitchOpen); }} // Prevent close on select
                  >
                    <Icon icon={item.icon} className="size-5 mr-2" />
                    <span>{item.label}</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isSwitchOpen ? 'rotate-90' : ''}`} />
                  </DropdownMenuItem>
                  {isSwitchOpen && (
                    <div className="pl-6">
                      {merchants.map((merchant) => (
                        <DropdownMenuItem 
                          key={merchant.id}
                          onClick={() => {
                            setSelectedMerchant(merchant);
                          }}
                        >
                          <Image 
                              src={theme === 'dark' && merchant.logoDarkUrl ? merchant.logoDarkUrl : merchant.logoUrl}
                              alt={merchant.name}
                              width={20}
                              height={20}
                              className="mr-2"
                          />
                          {merchant.name}
                          <Check className={`ml-auto h-4 w-4 ${selectedMerchant.id === merchant.id ? "opacity-100" : "opacity-0"}`} />
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            }

            return (
              <DropdownMenuItem 
                key={item.id} 
                asChild 
                className={`py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 ${isActive ? 'bg-[#E0F6FF] text-[#69C5EB]' : ''}`}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <Icon icon={item.icon} className="size-5" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default MobileHeader;