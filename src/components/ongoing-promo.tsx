import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PromoItem {
  name: string;
  value: string;
}

interface OngoingPromoProps {
  title: string;
  data: PromoItem[];
}

const OngoingPromo = ({ title, data }: OngoingPromoProps) => {
  return (
    <Card className="bg-white dark:bg-neutral-800 border-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </CardTitle>
          <Button variant="link" className="cursor-pointer text-sm p-0 h-auto hover:no-underline text-[#69C5EB] dark:text-sky-400">
            Lihat Detail
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {data.map((item) => (
          <div key={item.name} className="cursor-pointer p-4 rounded-lg flex justify-between items-center transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{item.value}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-[#69C5EB] dark:text-sky-400" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OngoingPromo;