import { iUser } from "../../interfaces/users";
import { contactRepository } from "../../repositories";
import { contactSchema } from "../../schemas/contacts";
import { iContactCreate, iContactResponse } from "../../interfaces/contacts";

const createUserContactService = async (
	data: iContactCreate,
	user: iUser
): Promise<iContactResponse> => {
	const newContact = contactRepository.create({ ...data, user });
	await contactRepository.save(newContact);

	return contactSchema.parse(newContact);
};

export default createUserContactService;
