import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from './ui/date-range-picker';

interface ListItem {
  name: string;
  value: string;
}

interface TopListCardProps {
  title: string;
  data: ListItem[];
  showDatePicker?: boolean;
}

const TopListCard = ({ title, data, showDatePicker = true }: TopListCardProps) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 border-none">
      <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800 dark:text-white">{title}</CardTitle>
          
          {showDatePicker && <DateRangePicker />}
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
              <span className="font-semibold text-gray-800 dark:text-white">{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopListCard;
