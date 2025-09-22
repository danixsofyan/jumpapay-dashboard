"use client"

import * as React from "react"
import { format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function DateRangePicker({ className }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  })

  const [preset, setPreset] = React.useState<string>("Last 30 Days")

  const handlePresetClick = (label: string, range: DateRange) => {
    setPreset(label);
    setDate(range);
  };

  const presets = [
    { label: "Real-time", range: { from: new Date(), to: new Date() } },
    { label: "Yesterday", range: { from: subDays(new Date(), 1), to: subDays(new Date(), 1) } },
    { label: "Last 7 Days", range: { from: subDays(new Date(), 6), to: new Date() } },
    { label: "Last 30 Days", range: { from: subDays(new Date(), 29), to: new Date() } },
  ];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal text-xs cursor-pointer",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {preset ? (
              <>{preset}</>
            ) : date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex text-xs calendar-theme-override" align="end">
          <div className="flex flex-col space-y-1 border-r p-2">
            {presets.map(({ label, range }) => (
              <Button
                key={label}
                variant={preset === label ? "secondary" : "ghost"}
                className="justify-start date-range-preset-button"
                onClick={() => handlePresetClick(label, range)}
              >
                {label}
              </Button>
            ))}
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              setPreset(undefined);
              setDate(range);
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}