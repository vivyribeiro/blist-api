import { z } from "zod";
import { userSchema, responseUserSchema } from "../users";

const contactSchema = z.object({
	id: z.string().uuid(),
	fullName: z.string().min(2).max(50),
	email: z.string().email().min(7).max(70),
	telephone: z.string().length(11),
	createdAt: z.date(),
	updatedAt: z.date()
});

const userContactSchema = contactSchema.extend({
	user: userSchema
});

const createContactSchema = contactSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});

const responseUserContactSchema = contactSchema.extend({
	user: responseUserSchema
});

const updateContactSchema = contactSchema
	.pick({
		fullName: true,
		email: true,
		telephone: true
	})
	.partial();

const listContactsSchema = z.array(responseUserContactSchema);

export {
	contactSchema,
	userContactSchema,
	listContactsSchema,
	createContactSchema,
	updateContactSchema,
	responseUserContactSchema
};
