import { Header } from "@/components/header";
import { CalendarView } from "@/components/workouts/calendar-view";
import { dummyWorkouts } from "@/lib/data";
import React from "react";

const WorkoutsPage = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1">{/* todo: stats */}</main>

      <CalendarView workouts={dummyWorkouts} />
    </div>
  );
};

export default WorkoutsPage;
