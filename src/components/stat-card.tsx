import { Card } from "@/components/ui/card";
import { Icon } from '@iconify/react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 border-none">
      <div className="flex items-center gap-4 p-4">
        <div className="bg-sky-100 dark:bg-sky-900 p-3 rounded-lg">
          <Icon icon={icon} className="size-6 text-[#69C5EB] dark:text-sky-400" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white break-words">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;