import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface StatsCardProps {
  className?: string;
}

export function StatsCard({ className = "" }: StatsCardProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-2", className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center w-full">
            Обработано за всё время
            <span className="ml-auto">
              <Calendar className="w-4 h-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          <div className="text-2xl font-bold">3,231</div>
          <p className="text-xs text-muted-foreground">
            +20.1% чем в прошлом месяце
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
