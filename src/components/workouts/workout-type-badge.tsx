"use client"

import { WorkoutType } from "@/lib/types"
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { WorkoutTypeIcon } from "./workout-type-icon";

interface WorkoutTypeBadgeProps {
    type: WorkoutType;
    className?: string;
  }

const colorMap: Record<WorkoutType, {bg: string, text: string}> = {
    Treadmill: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-800 dark:text-red-300" },
    Upper: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-800 dark:text-blue-300" },
    Dumbbell: { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-800 dark:text-purple-300" },
    Lower: { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-800 dark:text-orange-300" },
    Core: { bg: "bg-yellow-100 dark:bg-yellow-900/20", text: "text-yellow-800 dark:text-yellow-300" },
    Yoga: { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-800 dark:text-green-300" },
    Swimming: { bg: "bg-cyan-100 dark:bg-cyan-900/20", text: "text-cyan-800 dark:text-cyan-300" },
    Cycling: { bg: "bg-emerald-100 dark:bg-emerald-900/20", text: "text-emerald-800 dark:text-emerald-300" },
    Other: { bg: "bg-gray-100 dark:bg-gray-900/20", text: "text-gray-800 dark:text-gray-300" },
}

export function WorkoutTypeBadge({
    type,
    className,
}: WorkoutTypeBadgeProps) {
    const colors = colorMap[type] || { bg: "bg-gray-100", text: "text-gray-800" };

    return <Badge 
    variant="outline" 
    className={cn(
      "flex items-center gap-1 px-2 py-1 font-medium border-transparent",
      colors.bg,
      colors.text,
      className,
    )}
  >
    <WorkoutTypeIcon type={type} size={14} className="shrink-0" />
    <span>{type}</span>
  </Badge>
}