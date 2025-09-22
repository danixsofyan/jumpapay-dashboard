import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Order {
  nama: string;
  sku: string;
  platform: string;
  harga: string;
}

interface RecentOrdersProps {
  title: string;
  data: Order[];
}

const RecentOrders = ({ title, data }: RecentOrdersProps) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 border-none">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-600">
              <TableHead className="text-gray-500 dark:text-gray-400">Nama</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400">SKU</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400">Platform</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400">Harga</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order, index) => (
              <TableRow key={index} className="border-b border-gray-200 dark:border-neutral-700">
                <TableCell className="font-medium text-gray-800 dark:text-white">{order.nama}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{order.sku}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{order.platform}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{order.harga}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="bg-white dark:bg-neutral-700 dark:text-white dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-600">
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;