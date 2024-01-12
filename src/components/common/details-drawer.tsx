import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NotepadText } from "lucide-react";

import { Button } from "../ui/button";
import { StatsCard } from "../ui/stats-card";

export default function DetailsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"}>
          Статистика
          <NotepadText className="ml-2 w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pt-9">
          <DrawerTitle>Подробности работы</DrawerTitle>
          <DrawerDescription>
            Медиафайлов в обработке на данный момент нет.
          </DrawerDescription>
          <StatsCard className="mt-4" />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
