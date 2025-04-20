"use client";
import { workoutTypes } from "@/lib/data";
import { WorkoutType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { WorkoutTypeBadge } from "./workout-type-badge";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const workoutFormSchema = z.object({
  date: z.date(),
  types: z.array(z.enum(workoutTypes as [string, ...string[]])).min(1, "Select at least one workout type"),
  durationMinutes: z.number().optional(),
  caloriesBurned: z.number().optional(),
  steps: z.number().optional(),
  distanceKm: z.number().optional(),
  notes: z.string().optional(),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

interface WorkoutFormDialogProps {
  isOpen: boolean;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialDate: Date;
  uniqueWorkoutTypes: WorkoutType[];
}

export const WorkoutFormDialog = ({
  initialDate,
  isCurrentMonth,
  isOpen,
  isToday,
  setIsOpen,
  uniqueWorkoutTypes,
}: WorkoutFormDialogProps) => {
  const createWorkout = useMutation(api.workouts.create)
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      date: initialDate,
      types: [],
      durationMinutes: 30,
      caloriesBurned: 300,
      steps: undefined,
      distanceKm: undefined,
      notes: "",
    },
  });

  const onSubmit = async (data: WorkoutFormValues) => {
    const unixDate = Math.floor(data.date.getTime() / 1000)

    await createWorkout({
      ...data,
      date: unixDate
    })

    setIsOpen(false)
    toast.success("Workout created!")
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add / Edit Workout</DialogTitle>
          <DialogDescription>
            Fill out the forms to continue tracking your workouts!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="types"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Workout Types</FormLabel>
                    <FormDescription>
                      Click on the badges to select workout types
                    </FormDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workoutTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          const currentTypes = field.value || [];
                          if (currentTypes.includes(type as WorkoutType)) {
                            field.onChange(
                              currentTypes.filter((t) => t !== type)
                            );
                          } else {
                            field.onChange([...currentTypes, type as WorkoutType]);
                          }
                        }}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                      >
                        <WorkoutTypeBadge
                          type={type as WorkoutType}
                          className={cn(
                            field.value?.includes(type as WorkoutType)
                              ? "ring-1 ring-offset-1 ring-primary"
                              : "opacity-50"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="durationMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caloriesBurned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories Burned</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Steps (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="distanceKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (km, optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about your workout..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save Workout</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
