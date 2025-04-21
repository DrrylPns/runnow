"use client";

import { getCalendarMonth } from "@/lib/calendar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface CalendarViewProps {
  workouts: Doc<"workouts">[];
  onMonthChange?: (date: Date) => void;
}

export function CalendarView({ workouts, onMonthChange }: CalendarViewProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [calendarData, setCalendarData] = useState(
    getCalendarMonth(year, month, workouts)
  );

  useEffect(() => {
    setCalendarData(getCalendarMonth(year, month, workouts));
  }, [year, month, workouts]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleCurrentMonth = () => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  const handleSelectDay = (date: Date) => {
    router.push(`/workouts/add?date=${date.toISOString().split("T")[0]}`);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    onMonthChange?.(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => handleMonthChange(new Date(year, month - 1))}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(new Date(year, month), "MMMM yyyy")}
        </h2>
        <Button
          variant="outline"
          onClick={() => handleMonthChange(new Date(year, month + 1))}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <CalendarGrid days={calendarData.days} onSelectDay={handleSelectDay} />
      </div>
    </div>
  );
}
