import { z } from "zod";
import {
	contactSchema,
	userContactSchema,
	listContactsSchema,
	updateContactSchema,
	createContactSchema,
	responseUserContactSchema
} from "../../schemas/contacts";

type iContact = z.infer<typeof userContactSchema>;

type iContactCreate = z.infer<typeof createContactSchema>;

type iContactUpdate = z.infer<typeof updateContactSchema>;

type iContactResponse = z.infer<typeof contactSchema>;

type iUserContactResponse = z.infer<typeof responseUserContactSchema>;

type iContactsList = z.infer<typeof listContactsSchema>;

export {
	iContact,
	iContactsList,
	iContactUpdate,
	iContactCreate,
	iContactResponse,
	iUserContactResponse
};
