"use client"

import { Header } from "@/components/header";
import { CalendarView } from "@/components/workouts/calendar-view";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";

const WorkoutsPage = () => {
  const workouts = useQuery(api.workouts.get);

  if (workouts === undefined) {
    return (
      <div className="flex min-h-screen flex-col overflow-hidden">
        <main className="flex-1 p-8">
          <Skeleton className="h-[600px] w-full" />
        </main>
      </div>
    );
  }

  console.log(workouts)

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="flex-1">
        <CalendarView workouts={workouts} />
      </main>
    </div>
  );
};

export default WorkoutsPage;
