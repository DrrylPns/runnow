import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        name: v.string(),
        icon: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        // Check if custom workout type already exists for this user
        const existing = await ctx.db
            .query("customWorkoutTypes")
            .withIndex("by_user_name", (q) => q.eq("userId", userId).eq("name", args.name))
            .first()

        if (existing) {
            throw new Error("Custom workout type already exists")
        }

        return await ctx.db.insert("customWorkoutTypes", {
            userId,
            ...args,
        })
    }
})

export const getByUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        return await ctx.db
            .query("customWorkoutTypes")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect()
    }
})

export const deleteCustomType = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const customType = await ctx.db
            .query("customWorkoutTypes")
            .withIndex("by_user_name", (q) => q.eq("userId", userId).eq("name", args.name))
            .first()

        if (!customType) {
            throw new Error("Custom workout type not found")
        }

        await ctx.db.delete(customType._id)
    }
}) 