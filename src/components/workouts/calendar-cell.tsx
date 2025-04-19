"use client";

import {
  formatMinutesToHoursAndMinutes,
  getTotalCalories,
  getTotalDuration,
} from "@/lib/calendar";
import { CalendarDay } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WorkoutTypeIcon } from "./workout-type-icon";

interface CalendarCellProps {
  day: CalendarDay;
  onClick: (date: Date) => void;
}

export const CalendarCell = ({ day, onClick }: CalendarCellProps) => {
  const { date, isCurrentMonth, isToday, workouts } = day;

  const hasWorkouts = workouts.length > 0;
  const totalCalories = getTotalCalories(workouts);
  const totalDuration = getTotalDuration(workouts);

  // Get unique workout types
  const uniqueWorkoutTypes = Array.from(
    new Set(workouts.flatMap((workout) => workout.types))
  );

  return (
    <div
      onClick={() => onClick(date)}
      className={cn(
        "h-32 border p-1 relative transition-all hover:bg-muted/50 cursor-pointer",
        isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground",
        isToday && "border-sky-500"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="text-right p-1">
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full w-7 h-7 text-sm",
              isToday && "bg-sky-500 text-white font-medium"
            )}
          >
            {date.getDate()}
          </span>
        </div>

        {hasWorkouts ? (
          <div className="flex flex-col p-1 gap-1 h-full">
            <div className="flex flex-wrap gap-0.5 mb-1">
              {uniqueWorkoutTypes.slice(0, 4).map((type, index) => (
                <WorkoutTypeIcon
                  key={`${date.toISOString()}-${type}-${index}`}
                  type={type}
                  size={14}
                />
              ))}
              {uniqueWorkoutTypes.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{uniqueWorkoutTypes.length - 4}
                </span>
              )}
            </div>

            <div className="mt-auto text-xs space-y-0.5">
              <div className="text-muted-foreground">
                {formatMinutesToHoursAndMinutes(totalDuration)}
              </div>
              <div className="font-semibold">{totalCalories} kcal</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs opacity-70">
            No workouts
          </div>
        )}
      </div>
    </div>
  );
};
