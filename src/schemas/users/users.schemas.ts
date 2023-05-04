import { z } from "zod";
import { contactSchema } from "../contacts";

const validIdSchema = z.object({
	id: z.string().uuid("The id must be the type uuid.")
});

const userSchema = z.object({
	id: z.string().uuid(),
	fullName: z.string().min(2).max(50),
	email: z.string().email().min(7).max(70),
	password: z
		.string()
		.min(6)
		.max(120)
		.regex(new RegExp(".*[A-Z].*"), "Pelo menos uma letra maiúscula")
		.regex(new RegExp(".*[a-z].*"), "Pelo menos uma letra minúscula")
		.regex(new RegExp(".*\\d.*"), "Pelo menos um número")
		.regex(
			new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
			"Pelo menos um caractere especial"
		),
	telephone: z
		.string()
		.length(11)
		.regex(/^[0-9]+$/, "Phone number must contain only numbers"),
	role: z.enum(["admin", "client"]).default("client"),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
	resetToken: z.string().nullable(),
	confirmationToken: z.string().nullable(),
	isEmailVerified: z.boolean().default(false)
});

const createUserSchema = userSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
	resetToken: true,
	isEmailVerified: true,
	confirmationToken: true
});

const responseUserSchema = userSchema.omit({
	password: true,
	confirmationToken: true
});

const userReportSchema = responseUserSchema.extend({
	contacts: z.array(contactSchema)
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
