"use client";

import { WorkoutType } from "@/lib/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { WorkoutTypeIcon } from "./workout-type-icon";
import { useMemo } from "react";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

interface WorkoutTypeBadgeProps {
  type: WorkoutType;
  className?: string;
  isCustom?: boolean;
}

const defaultColorMap: Record<WorkoutType, { bg: string; text: string }> = {
  "Treadmill-Running": {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
  },
  "Treadmill-Walking": {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
  },
  Barbell: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-300",
  },
  Dumbbell: {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    text: "text-orange-800 dark:text-orange-300",
  },
  Running: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-300",
  },
  Yoga: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-300",
  },
  Swimming: {
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
    text: "text-cyan-800 dark:text-cyan-300",
  },
  Walking: {
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
    text: "text-emerald-800 dark:text-emerald-300",
  },
  Other: {
    bg: "bg-gray-100 dark:bg-gray-900/20",
    text: "text-gray-800 dark:text-gray-300",
  },
};

const customColorOptions = [
  {
    bg: "bg-pink-100 dark:bg-pink-900/20",
    text: "text-pink-800 dark:text-pink-300",
  },
  {
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    text: "text-indigo-800 dark:text-indigo-300",
  },
  {
    bg: "bg-teal-100 dark:bg-teal-900/20",
    text: "text-teal-800 dark:text-teal-300",
  },
  {
    bg: "bg-rose-100 dark:bg-rose-900/20",
    text: "text-rose-800 dark:text-rose-300",
  },
  {
    bg: "bg-violet-100 dark:bg-violet-900/20",
    text: "text-violet-800 dark:text-violet-300",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-900/20",
    text: "text-amber-800 dark:text-amber-300",
  },
  {
    bg: "bg-lime-100 dark:bg-lime-900/20",
    text: "text-lime-800 dark:text-lime-300",
  },
  {
    bg: "bg-sky-100 dark:bg-sky-900/20",
    text: "text-sky-800 dark:text-sky-300",
  },
];

export function WorkoutTypeBadge({
  type,
  className,
  isCustom,
}: WorkoutTypeBadgeProps) {
  const deleteCustomType = useMutation(api.customWorkoutTypes.deleteCustomType);

  const colors = useMemo(() => {
    // If it's a default type, use the predefined colors
    if (type in defaultColorMap) {
      return defaultColorMap[type as keyof typeof defaultColorMap];
    }

    // For custom types, generate a consistent random color based on the type name
    const hash = type.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const index = Math.abs(hash) % customColorOptions.length;
    return customColorOptions[index];
  }, [type]);

  const handleDelete = async () => {
    try {
      await deleteCustomType({ name: type });
      toast.success("Custom workout type deleted");
    } catch (error) {
      toast.error("Failed to delete custom workout type");
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1 px-2 py-1 font-medium border-transparent group",
        colors.bg,
        colors.text,
        className
      )}
    >
      <WorkoutTypeIcon type={type} size={14} className="shrink-0" />
      <span>{type}</span>
      {isCustom && (
        <button
          form="workoutTypes"
          onClick={handleDelete}
          className="cursor-pointer ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
