import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Calendar, Timer } from 'lucide-react';

import { NotepadText } from 'lucide-react';
import { Button } from '../ui/button';
import { StatsCard } from '../ui/stats-card';
import useData from '@/hooks/useData';
import { useEffect, useState } from 'react';
import { Tasks } from '@/types';
import { toast } from 'sonner';

export default function DetailsDrawer() {
  const {
    tasksQuery: { data, isLoading, isSuccess },
    tasksMutation: { mutate: clearTasks, isPending: isClearing },
  } = useData();

  const [tasks, setTasks] = useState<Tasks | null>(data?.data);

  useEffect(() => {
    if (!isLoading && isSuccess) setTasks(data?.data);
  }, [data, isLoading, isSuccess]);

  if (!isSuccess)
    return (
      <Button
        variant={'ghost'}
        onClick={() => toast.error('Произошла ошибка при получении данных.')}>
        Статистика
        <NotepadText className="ml-2 w-4 h-4" />
      </Button>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={'ghost'}>
          Статистика
          <NotepadText className="ml-2 w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pt-9">
          <DrawerTitle>Подробности работы</DrawerTitle>
          {!tasks?.active ? (
            <DrawerDescription className="mb-4">
              Медиафайлов в обработке на данный момент нет.
            </DrawerDescription>
          ) : (
            <div className="relative">
              <StatsCard
                className="mt-6"
                title="В обработке"
                titleIcon={<Timer className="w-4 h-4" />}
                value={tasks?.active}
                subtitle={<>Ожидает обработки: {tasks?.waiting}</>}
              />
              <Button
                className="absolute bottom-2 right-2"
                size={'sm'}
                variant={'destructive'}
                onClick={() => clearTasks()}
                disabled={isClearing}>
                Остановить
              </Button>
            </div>
          )}

          <StatsCard
            className=""
            titleIcon={<Calendar className="w-4 h-4" />}
            title="Всего загружено"
            value={tasks?.completed}
            subtitle={<>Завершено с ошибкой: {tasks?.failed}</>}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
