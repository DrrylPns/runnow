"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workout } from "@/lib/types";
import { format } from "date-fns";
import { Activity, Clock, Flame } from "lucide-react";
import { TbShoe } from "react-icons/tb";

interface WorkoutDashboardProps {
  workouts: Workout[];
  currentMonth: Date;
}

export function WorkoutDashboard({
  workouts,
  currentMonth,
}: WorkoutDashboardProps) {
  // Filter workouts for the current month
  const monthWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.date * 1000);
    return (
      workoutDate.getMonth() === currentMonth.getMonth() &&
      workoutDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  // Calculate total duration in hours
  const totalDuration = monthWorkouts.reduce((acc, workout) => {
    return acc + (workout.durationSeconds || 0);
  }, 0);
  const totalHours = Math.floor(totalDuration / 3600);
  const totalMinutes = Math.floor((totalDuration % 3600) / 60);

  const totalCalories = monthWorkouts.reduce((acc, workouts) => {
    return acc + (workouts.caloriesBurned || 0);
  }, 0);

  const totalSteps = monthWorkouts.reduce((acc, workouts) => {
    return acc + (workouts.steps || 0);
  }, 0);

  const totalDistance = monthWorkouts.reduce((acc, workouts) => {
    return acc + (workouts.distanceKm || 0);
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Monthly stats</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalHours}h {totalMinutes}m
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calories Burned
            </CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCalories.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Steps</CardTitle>
            <TbShoe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSteps.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Distance
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalDistance.toFixed(1)} km
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
