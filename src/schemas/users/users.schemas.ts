import { z } from "zod";
import { UserRole } from "../../interfaces/users/users.interfaces";

const validIdSchema = z.object({
	id: z.string().uuid("The id must be the type uuid.")
});

const userSchema = z.object({
	id: z.string().uuid(),
	fullName: z.string().min(2).max(50),
	email: z.string().email().min(7).max(70),
	password: z.string().min(6).max(120),
	telephone: z.string().length(11),
	role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
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

const updateUserSchema = userSchema
	.pick({
		fullName: true,
		email: true,
		password: true,
		telephone: true,
		deletedAt: true
	})
	.partial();

const listUsersSchema = z.array(responseUserSchema);

export {
	userSchema,
	validIdSchema,
	listUsersSchema,
	createUserSchema,
	updateUserSchema,
	responseUserSchema
};