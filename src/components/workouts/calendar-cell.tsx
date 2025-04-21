"use client";

import {
  formatDuration,
  getTotalCalories,
  getTotalDuration,
} from "@/lib/calendar";
import { CalendarDay, WorkoutType, Workout } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { WorkoutFormDialog } from "./workout-form";
import { WorkoutTypeIcon } from "./workout-type-icon";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarCellProps {
  day: CalendarDay;
  onClick: (date: Date) => void;
  index: number;
}

export const CalendarCell = ({ day, onClick, index }: CalendarCellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>();
  const { date, isCurrentMonth, isToday, workouts } = day;

  const hasWorkouts = workouts.length > 0;
  const totalCalories = getTotalCalories(workouts);
  const totalDuration = getTotalDuration(workouts);

  // Get unique workout types
  const uniqueWorkoutTypes = Array.from(
    new Set(workouts.flatMap((workout) => workout.types))
  );

  const handleEdit = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsOpen(true);
  };

  return (
    <>
      <div
        // onClick={() => onClick(date)}
        onClick={() => setIsOpen(true)}
        className={cn(
          "h-32 border p-1 relative transition-all hover:bg-muted/50 cursor-pointer",
          isCurrentMonth
            ? "bg-background"
            : "bg-muted/30 text-muted-foreground",
          isToday && "border-sky-500"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-between">
            <div className="text-left p-1">
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full w-7 h-7 text-lg",
                  isToday && "bg-sky-500 text-white font-medium"
                )}
              >
                {date.getDate()}
              </span>
            </div>

            {workouts.map((workout) => (
              <div key={workout._id} className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(workout);
                  }}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {hasWorkouts ? (
            <div className="flex flex-col p-1 gap-1 h-full">
              <div className="flex flex-wrap gap-0.5 mb-1">
                {workouts.map((workout) => (
                  <div key={workout._id} className="flex items-center gap-1">
                    {workout.types.slice(0, 2).map((type) => {
                      return (
                        <WorkoutTypeIcon type={type as WorkoutType} size={20} />
                      );
                    })}
                    {workout.types.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{workout.types.length - 2}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto text-xs space-y-0.5">
                <div className="text-muted-foreground">
                  {formatDuration(totalDuration)}
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

      <WorkoutFormDialog
        initialDate={date}
        isCurrentMonth={isCurrentMonth}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isToday={isToday}
        uniqueWorkoutTypes={uniqueWorkoutTypes}
        workoutToEdit={selectedWorkout}
        key={index}
      />
    </>
  );
};
