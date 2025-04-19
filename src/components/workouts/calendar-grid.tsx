"use client";
import { CalendarDay } from "@/lib/types";
import { CalendarCell } from "./calendar-cell";

interface CalendarGridProps {
  days: CalendarDay[];
  onSelectDay: (date: Date) => void;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CalendarGrid = ({ days, onSelectDay }: CalendarGridProps) => {
  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-sky-300 text-white">
        {weekdays.map((day) => (
          <div className="text-center p-2 text-sm font-medium" key={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Actual calendar days */}
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <CalendarCell
            key={day.date.toISOString()}
            day={day}
            onClick={onSelectDay}
          />
        ))}
      </div>
    </div>
  );
};
