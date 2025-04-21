"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { WorkoutCard } from "./workout-card";

export function WorkoutList() {
  const workouts = useQuery(api.workouts.get);

  if (!workouts) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading workouts...</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No workouts found. Add your first workout to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout._id} workout={workout} />
      ))}
    </div>
  );
} 