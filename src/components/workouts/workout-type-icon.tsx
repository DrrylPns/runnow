"use client";

import React from "react";
import { WorkoutType } from "@/lib/types";
import { TbTreadmill, TbSwimming } from "react-icons/tb";
import { IoBarbellOutline } from "react-icons/io5";
import { LuDumbbell } from "react-icons/lu";
import { LiaRunningSolid, LiaWalkingSolid } from "react-icons/lia";
import { GrYoga } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface WorkoutTypeIconProps {
  type: WorkoutType;
  className?: string;
  size?: number;
}

const colorMap: Record<WorkoutType, string> = {
  "Treadmill-Running": "text-red-500",
  "Treadmill-Walking": "text-blue-500",
  Barbell: "text-purple-500",
  Dumbbell: "text-orange-500",
  Running: "text-yellow-500",
  Yoga: "text-green-500",
  Swimming: "text-cyan-500",
  Walking: "text-emerald-500",
};

export const WorkoutTypeIcon: React.FC<WorkoutTypeIconProps> = ({
  type,
  className,
  size = 20,
}) => {
  const customTypes = useQuery(api.customWorkoutTypes.getByUser);
  const customType = customTypes?.find(t => t.name === type);

  const iconColor = colorMap[type] || "text-gray-500";

  const getIcon = () => {
    if (customType) {
      // Try to dynamically import the icon from lucide-react
      try {
        const Icon = require(`lucide-react`)[customType.icon];
        return Icon ? <Icon size={size} className={cn(iconColor, className)} /> : <Ellipsis size={size} className={cn(iconColor, className)} />;
      } catch {
        return <Ellipsis size={size} className={cn(iconColor, className)} />;
      }
    }

    switch (type) {
      case "Treadmill-Running":
        return <TbTreadmill size={size} className={cn(iconColor, className)} />;
      case "Barbell":
        return (
          <IoBarbellOutline size={size} className={cn(iconColor, className)} />
        );
      case "Dumbbell":
        return <LuDumbbell size={size} className={cn(iconColor, className)} />;
      case "Running":
        return <LiaRunningSolid size={size} className={cn(iconColor, className)} />;
      case "Treadmill-Walking":
        return <TbTreadmill size={size} className={cn(iconColor, className)} />;
      case "Yoga":
        return <GrYoga size={size} className={cn(iconColor, className)} />;
      case "Swimming":
        return <TbSwimming size={size} className={cn(iconColor, className)} />;
      case "Walking":
        return <LiaWalkingSolid size={size} className={cn(iconColor, className)} />;
      default:
        return <Ellipsis size={size} className={cn(iconColor, className)} />;
    }
  };

  return getIcon();
};
