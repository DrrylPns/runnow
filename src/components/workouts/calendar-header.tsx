"use client";

import { getMonthName } from "@/lib/calendar";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onCurrentMonth: () => void;
}

export const CalendarHeader = ({
  month,
  onCurrentMonth,
  onNextMonth,
  onPrevMonth,
  year,
}: CalendarHeaderProps) => {
  const monthName = getMonthName(month);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {monthName} {year}
        </h2>
        <p className="text-muted-foreground">
          Track and view your workout progress
        </p>
      </div>
      <div className="flex items-center gap-3 w-full justify-end px-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onCurrentMonth}
          className="hidden sm:flex w-[100px]"
        >
          Today
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
