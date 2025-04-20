import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { WorkoutType } from "@/lib/types";

export const create = mutation({
    args: {
        date: v.number(),
        types: v.array(v.string()),
        durationMinutes: v.optional(v.number()),
        caloriesBurned: v.optional(v.number()),
        distanceKm: v.optional(v.number()),
        steps: v.optional(v.number()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        return await ctx.db.insert("workouts", {
            userId,
            ...args,
        })
    }
})

// export const create = mutation({
//     args: {
//         date: v.number(),
//         types: v.array(v.string()),
//         durationMinutes: v.number(),
//         caloriesBurned: v.number(),
//         steps: v.optional(v.number()),
//         distanceKm: v.optional(v.number()),
//         notes: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;

//         return await ctx.db.insert("workouts", {
//             userId,
//             ...args,
//         });
//     },
// });

// export const update = mutation({
//     args: {
//         id: v.id("workouts"),
//         date: v.number(),
//         types: v.array(v.string()),
//         durationMinutes: v.number(),
//         caloriesBurned: v.number(),
//         steps: v.optional(v.number()),
//         distanceKm: v.optional(v.number()),
//         notes: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;
//         const workout = await ctx.db.get(args.id);

//         if (!workout) {
//             throw new Error("Workout not found");
//         }

//         if (workout.userId !== userId) {
//             throw new Error("Not authorized");
//         }

//         const { id, ...data } = args;
//         return await ctx.db.patch(id, data);
//     },
// });

// export const remove = mutation({
//     args: { id: v.id("workouts") },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;
//         const workout = await ctx.db.get(args.id);

//         if (!workout) {
//             throw new Error("Workout not found");
//         }

//         if (workout.userId !== userId) {
//             throw new Error("Not authorized");
//         }

//         return await ctx.db.delete(args.id);
//     },
// });

// export const getByDate = query({
//     args: { date: v.number() },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;

//         return await ctx.db
//             .query("workouts")
//             .withIndex("by_user_date", (q) =>
//                 q.eq("userId", userId).eq("date", args.date)
//             )
//             .collect();
//     },
// });

// export const getByDateRange = query({
//     args: { startDate: v.number(), endDate: v.number() },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;

//         return await ctx.db
//             .query("workouts")
//             .withIndex("by_user_date", (q) =>
//                 q.eq("userId", userId).gte("date", args.startDate).lte("date", args.endDate)
//             )
//             .collect();
//     },
// });

// export const getStats = query({
//     args: { startDate: v.number(), endDate: v.number() },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Not authenticated");
//         }

//         const userId = identity.subject;

//         const workouts = await ctx.db
//             .query("workouts")
//             .withIndex("by_user_date", (q) =>
//                 q.eq("userId", userId).gte("date", args.startDate).lte("date", args.endDate)
//             )
//             .collect();

//         const totalDuration = workouts.reduce((sum, workout) => sum + workout.durationMinutes, 0);
//         const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
//         const totalSteps = workouts.reduce((sum, workout) => sum + (workout.steps || 0), 0);
//         const totalDistance = workouts.reduce((sum, workout) => sum + (workout.distanceKm || 0), 0);

//         return {
//             totalWorkouts: workouts.length,
//             totalDuration,
//             totalCalories,
//             totalSteps,
//             totalDistance,
//         };
//     },
// }); 