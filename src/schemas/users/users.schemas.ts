import { z } from "zod";
import { listContactsSchema } from "../contacts";

const validIdSchema = z.object({
	id: z.string().uuid("The id must be the type uuid.")
});

const userSchema = z.object({
	id: z.string().uuid(),
	fullName: z.string().min(2).max(50),
	email: z.string().email().min(7).max(70),
	password: z.string().min(6).max(120),
	telephone: z.string().length(11),
	role: z.enum(["admin", "client"]).default("client"),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date().nullable()
});

const createUserSchema = userSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

const responseUserSchema = userSchema.omit({ password: true });

const userReportSchema = responseUserSchema.extend({
	contacts: listContactsSchema
});

const updateUserSchema = userSchema
	.pick({
		fullName: true,
		email: true,
		password: true,
		telephone: true
	})
	.partial();

const listUsersSchema = z.array(responseUserSchema);

export {
	userSchema,
	validIdSchema,
	listUsersSchema,
	createUserSchema,
	updateUserSchema,
	userReportSchema,
	responseUserSchema
};
