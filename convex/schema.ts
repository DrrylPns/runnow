import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workouts: defineTable({
        userId: v.string(), // Clerk user ID
        date: v.number(), // Unix timestamp
        types: v.array(v.string()), // Array of WorkoutType
        durationMinutes: v.optional(v.number()),
        caloriesBurned: v.optional(v.number()),
        steps: v.optional(v.number()),
        distanceKm: v.optional(v.number()),
        notes: v.optional(v.string()),
    })
        .index("by_user", ["userId"])
        .index("by_user_date", ["userId", "date"])
        .index("by_date", ["date"]),
});