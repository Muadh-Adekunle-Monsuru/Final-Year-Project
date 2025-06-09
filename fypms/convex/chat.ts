import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { query } from './_generated/server';

export const sendMessage = mutation({
	args: {
		supervisorId: v.string(),
		studentId: v.string(),
		message: v.object({
			sender: v.string(),
			content: v.string(),
			timestamp: v.string(),
			messageId: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		console.log('This TypeScript function is running on the server.');

		// check if conversation between supervisor and student already exists
		const existingConversation = await ctx.db
			.query('messages')
			.filter((q) =>
				q.and(
					q.eq(q.field('supervisorId'), args.supervisorId),
					q.eq(q.field('studentId'), args.studentId)
				)
			)
			.first();

		// If conversation exists, append the new message to the existing messages
		if (existingConversation) {
			await ctx.db.patch(existingConversation._id, {
				messages: [...existingConversation.messages, { ...args.message }],
			});
			return;
		}
		// If conversation does not exist, create a new one

		await ctx.db.insert('messages', {
			supervisorId: args.supervisorId,
			studentId: args.studentId,
			messages: [{ ...args.message }],
		});
	},
});

export const getMessages = query({
	args: {
		supervisorId: v.string(),
		studentId: v.string(),
	},
	handler: async (ctx, args) => {
		const messages = await ctx.db
			.query('messages')
			.filter((q) =>
				q.and(
					q.eq(q.field('supervisorId'), args.supervisorId),
					q.eq(q.field('studentId'), args.studentId)
				)
			)
			.first();
		// Reverse the list so that it's in a chronological order.
		return messages?.messages;
	},
});
