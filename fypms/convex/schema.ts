import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		supervisorId: v.string(),
		studentId: v.string(),
		messages: v.array(
			v.object({
				sender: v.string(),
				content: v.string(),
				timestamp: v.string(),
				messageId: v.string(),
			})
		),
	}),
});
