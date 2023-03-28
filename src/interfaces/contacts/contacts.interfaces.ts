import { z } from "zod";
import {
	contactSchema,
	listContactsSchema,
	updateContactSchema,
	createContactsSchema,
	responseContactSchema
} from "../../schemas/contacts";

type iContact = z.infer<typeof contactSchema>;

type iContactsCreate = z.infer<typeof createContactsSchema>;

type iContactUpdate = z.infer<typeof updateContactSchema>;

type iContactResponse = z.infer<typeof responseContactSchema>;

type iContactsList = z.infer<typeof listContactsSchema>;

export {
	iContact,
	iContactsList,
	iContactUpdate,
	iContactsCreate,
	iContactResponse
};
