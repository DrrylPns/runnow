"use client";

import React from "react";
import { WorkoutType } from "@/lib/types";
import {
  Dumbbell,
  FileWarning as Running,
  Accessibility,
  ArrowUpDown,
  Layers,
  Cog as Yoga,
  Bike,
  Minimize as Swimming,
  Ellipsis,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutTypeIconProps {
  type: WorkoutType;
  className?: string;
  size?: number;
}

const colorMap: Record<WorkoutType, string> = {
  Treadmill: "text-red-500",
  Upper: "text-blue-500",
  Dumbbell: "text-purple-500",
  Lower: "text-orange-500",
  Core: "text-yellow-500",
  Yoga: "text-green-500",
  Swimming: "text-cyan-500",
  Cycling: "text-emerald-500",
  Other: "text-gray-500",
};

export const WorkoutTypeIcon: React.FC<WorkoutTypeIconProps> = ({
  type,
  className,
  size = 20,
}) => {
  const iconColor = colorMap[type] || "text-gray-500";

  const getIcon = () => {
    switch (type) {
      case "Treadmill":
        return <Running size={size} className={cn(iconColor, className)} />;
      case "Upper":
        return (
          <Accessibility size={size} className={cn(iconColor, className)} />
        );
      case "Dumbbell":
        return <Dumbbell size={size} className={cn(iconColor, className)} />;
      case "Lower":
        return <ArrowUpDown size={size} className={cn(iconColor, className)} />;
      case "Core":
        return <Layers size={size} className={cn(iconColor, className)} />;
      case "Yoga":
        return <Yoga size={size} className={cn(iconColor, className)} />;
      case "Swimming":
        return <Swimming size={size} className={cn(iconColor, className)} />;
      case "Cycling":
        return <Bike size={size} className={cn(iconColor, className)} />;
      case "Other":
      default:
        return <Ellipsis size={size} className={cn(iconColor, className)} />;
    }
  };

  return getIcon();
};
