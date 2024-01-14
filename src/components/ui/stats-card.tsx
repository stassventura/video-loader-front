import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatsCardProps {
  className?: string;
  title: string;
  titleIcon?: ReactNode;
  value: number | undefined;
  subtitle?: ReactNode;
}

export function StatsCard({
  className = '',
  title,
  value,
  subtitle,
  titleIcon: TitleIcon,
}: StatsCardProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-2', className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center w-full">
            {title}
            {TitleIcon && <span className="ml-auto">{TitleIcon}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          <div className="text-2xl font-bold">{value ? value : <>...</>}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground flex items-center">{subtitle}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
