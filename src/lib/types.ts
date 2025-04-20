import { Doc } from "../../convex/_generated/dataModel";

export type WorkoutType =
    | 'Treadmill'
    | 'Upper'
    | 'Dumbbell'
    | 'Lower'
    | 'Core'
    | 'Yoga'
    | 'Swimming'
    | 'Cycling'
    | 'Other';

export interface Workout {
    id: string;
    date: Date;
    types: WorkoutType[];
    durationMinutes: number;
    caloriesBurned: number;
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