import { iUser } from "../../interfaces/users";
import { contactRepository } from "../../repositories";
import { responseContactSchema } from "../../schemas/contacts";
import { iContactsCreate, iContactsList } from "../../interfaces/contacts";

const createUserContactsService = async (
	data: iContactsCreate,
	user: iUser
): Promise<iContactsList> => {
	const contacts: iContactsList = [];

	for (const index in data) {
		const newContact = contactRepository.create({ ...data[index], user });
		await contactRepository.save(newContact);

		const createdContact = responseContactSchema.parse(newContact);
		contacts.push(createdContact);
	}

	return contacts;
};

export default createUserContactsService;
