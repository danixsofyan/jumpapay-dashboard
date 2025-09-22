"use client"

import * as React from "react"
import { Check, ChevronsUpDown, RefreshCw } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const merchants = [
  {
    id: "gamaloka",
    name: "Gamaloka",
    logoUrl: "/images/logo-gamaloka.png",
  },
  {
    id: "jumpapay",
    name: "Jumpapay",
    logoUrl: "/images/logo-jumpapay.png",
  },
]

export function MerchantSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [selectedMerchant, setSelectedMerchant] = React.useState(merchants[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Image src={selectedMerchant.logoUrl} alt={selectedMerchant.name} width={20} height={20} />
            {selectedMerchant.name}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
        <PopoverContent className="w-[200px] p-0">
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-sky-100 p-2 rounded-md">
                    <RefreshCw className="h-5 w-5 text-sky-600" />
                </div>
                <p>Ganti Merchant</p>
            </div>
            <div className="flex flex-col space-y-1">
                {merchants.map((merchant) => (
                <Button
                    key={merchant.id}
                    variant="ghost"
                    onClick={() => {
                        setSelectedMerchant(merchant)
                        setOpen(false)
                    }}
                    className="w-full justify-start gap-2"
                >
                    <Image src={merchant.logoUrl} alt={merchant.name} width={20} height={20} />
                    {merchant.name}
                    <Check
                        className={cn(
                        "ml-auto h-4 w-4",
                        selectedMerchant.id === merchant.id ? "opacity-100" : "opacity-0"
                        )}
                    />
                </Button>
                ))}
            </div>
        </div>
        </PopoverContent>
    </Popover>
  )
}