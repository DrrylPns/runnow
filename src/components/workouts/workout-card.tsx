import { Clock } from "lucide-react";
import { Doc } from "../../../convex/_generated/dataModel";

interface WorkoutCardProps {
  workout: Doc<"workouts">;
}

const formatDuration = (seconds: number | undefined) => {
  if (!seconds) return null;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
  
  return parts.join(" ");
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{workout.types.join(", ")}</h3>
        <span className="text-sm text-muted-foreground">
          {new Date(workout.date * 1000).toLocaleDateString()}
        </span>
      </div>
      
      {workout.durationSeconds && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(workout.durationSeconds)}</span>
        </div>
      )}
      
      {workout.notes && (
        <p className="text-sm text-muted-foreground">{workout.notes}</p>
      )}
    </div>
  );
} 