"use client";

import { getCalendarMonth } from "@/lib/calendar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { Doc } from "../../../convex/_generated/dataModel";

interface CalendarViewProps {
  workouts: Doc<"workouts">[];
}

export function CalendarView({ workouts }: CalendarViewProps) {
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

  return (
    <div className="animate-in fade-in-50 duration-500 h-full px-[32px] mb-[32px]">
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onCurrentMonth={handleCurrentMonth}
      />

      <CalendarGrid days={calendarData.days} onSelectDay={handleSelectDay} />
    </div>
  );
}
