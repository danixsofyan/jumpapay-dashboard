"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DateRangePicker } from "./ui/date-range-picker";

interface ChartMeta {
  key: string;
  color: string;
  total: number;
}

interface ChartDataItem {
  name: string;
  [key: string]: any;
}

interface OrderHistoryChartProps {
  data: {
    meta: ChartMeta[];
    data: ChartDataItem[];
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:bg-neutral-800 text-black dark:text-white p-4 rounded-lg shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((pld: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: pld.color }}
                />
                <span>{pld.dataKey}</span>
              </div>
              <span className="font-semibold ml-4">: {pld.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const OrderHistoryChart = ({ data: chartData }: OrderHistoryChartProps) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <DateRangePicker />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-slate-700" />
              <XAxis dataKey="name" stroke="#888888" className="dark:stroke-gray-500" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" className="dark:stroke-gray-500" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {chartData.meta.map((line) => (
                <Line
                  key={line.key} type="linear" dataKey={line.key} stroke={line.color}
                  strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap mt-4 divide-x divide-dashed divide-gray-200 dark:divide-slate-700">
          {chartData.meta.map((item) => (
            <div key={item.key} className="px-4 py-2 flex-1 min-w-[120px]">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm text-muted-foreground dark:text-gray-400 truncate">{item.key}</p>
              </div>
              <p className="font-bold text-2xl mt-1 text-gray-800 dark:text-white">{item.total}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistoryChart;