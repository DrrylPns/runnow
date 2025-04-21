import { Doc } from "../../convex/_generated/dataModel";

export type WorkoutType =
  | "Dumbbell"
  | "Barbell"
  | "Treadmill-Running"
  | "Treadmill-Walking"
  | "Yoga"
  | "Running"
  | "Walking"
  | "Swimming"
  | string; // Allow custom workout types

export interface Workout {
  _id: string;
  _creationTime: number;
  userId: string;
  date: number;
  types: string[];
  durationSeconds?: number;
  caloriesBurned?: number;
  steps?: number;
  distanceKm?: number;
  notes?: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  workouts: Doc<"workouts">[];
}

export interface CalendarMonth {
  year: number;
  month: number; // 0-indexed (0 = January)
  days: CalendarDay[];
}
