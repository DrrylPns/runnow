import { Doc } from "../../convex/_generated/dataModel";
import { CalendarDay, CalendarMonth, Workout } from "./types";

export function getCalendarMonth(year: number, month: number, workouts: Doc<"workouts">[]): CalendarMonth {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Get today's date for highlighting the current day
    const today = new Date();
    const isToday = (date: Date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    // Create array of days for the calendar
    const days: CalendarDay[] = [];

    // Add days from previous month to fill the first week
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevMonthYear = month - 1 < 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
        const date = new Date(prevMonthYear, prevMonth, daysInPrevMonth - firstDayOfWeek + i + 1);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            workouts: filterWorkoutsByDate(workouts, date)
        });
    }

    // Add days for current month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push({
            date,
            isCurrentMonth: true,
            isToday: isToday(date),
            workouts: filterWorkoutsByDate(workouts, date)
        });
    }

    // Add days from next month to complete the last week
    const lastDayOfWeek = lastDayOfMonth.getDay();
    const nextMonth = month + 1 > 11 ? 0 : month + 1;
    const nextMonthYear = month + 1 > 11 ? year + 1 : year;

    const daysToAdd = 6 - lastDayOfWeek;
    for (let i = 1; i <= daysToAdd; i++) {
        const date = new Date(nextMonthYear, nextMonth, i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            workouts: filterWorkoutsByDate(workouts, date)
        });
    }

    return {
        year,
        month,
        days
    };
}

function filterWorkoutsByDate(workouts: Doc<"workouts">[] | undefined, date: Date): Doc<"workouts">[] {
    if (!workouts) return [];

    return workouts.filter(workout => {
        // Convert Unix timestamp to milliseconds and create Date object
        const workoutDate = new Date(workout.date * 1000);
        return (
            workoutDate.getDate() === date.getDate() &&
            workoutDate.getMonth() === date.getMonth() &&
            workoutDate.getFullYear() === date.getFullYear()
        );
    });
}

export function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
}

export function formatMinutesToHoursAndMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${remainingMinutes}m`;
    }
}

export function getTotalCalories(workouts: Doc<"workouts">[]): number {
    return workouts.reduce((total, workout) => total + (workout.caloriesBurned || 0), 0);
}

export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

    return parts.join(" ");
}

export function getTotalDuration(workouts: Doc<"workouts">[]): number {
    return workouts.reduce((total, workout) => total + (workout.durationSeconds || 0), 0);
}

export function getTotalSteps(workouts: Doc<"workouts">[]): number {
    return workouts.reduce((total, workout) => total + (workout.steps || 0), 0);
}

export function getTotalDistance(workouts: Doc<"workouts">[]): number {
    return workouts.reduce(
        (total, workout) => total + (workout.distanceKm || 0),
        0
    );
}