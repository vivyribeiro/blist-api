import { z } from "zod";
import { userSchema, responseUserSchema } from "../users";

const contactSchema = userSchema
	.omit({
		password: true,
		role: true,
		deletedAt: true
	})
	.extend({
		user: userSchema
	});

const createContactsSchema = contactSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
		user: true
	})
	.array();

const responseContactSchema = contactSchema.omit({ user: true });

const updateContactSchema = responseContactSchema
	.pick({
		fullName: true,
		email: true,
		telephone: true
	})
	.partial();

const listContactsSchema = z.array(responseContactSchema);

export {
	contactSchema,
	listContactsSchema,
	createContactsSchema,
	updateContactSchema,
	responseContactSchema
};
