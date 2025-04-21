"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CalendarView } from "@/components/workouts/calendar-view";
import { WorkoutDashboard } from "@/components/workouts/workout-dashboard";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

const WorkoutsPage = () => {
  const workouts = useQuery(api.workouts.get);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (workouts === undefined) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[110px]" />
            ))}
          </div>
          <Skeleton className="h-[600px] w-full" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 h-full">
        <div className="space-y-8 h-full">
          <WorkoutDashboard workouts={workouts} currentMonth={currentMonth} />
          <CalendarView workouts={workouts} onMonthChange={setCurrentMonth} />
        </div>
      </main>
    </div>
  );
};

export default WorkoutsPage;
