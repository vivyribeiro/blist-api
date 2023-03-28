import { AppError } from "../../errors";
import { contactRepository } from "../../repositories";
import { updateContactSchema } from "../../schemas/contacts";
import { iContactResponse, iContactUpdate } from "../../interfaces/contacts";

const updateContactService = async (
	data: iContactUpdate,
	foundContact: iContactResponse
): Promise<iContactResponse> => {
	if (!Object.keys(foundContact).length) {
		throw new AppError(
			`Invalid field(s)! Must contains at least one of those fields: ${updateContactSchema
				.keyof()
				.options.join(", ")}`,
			401
		);
	}

	const updatedContact = contactRepository.create({
		...foundContact,
		fullName: data.fullName ? data.fullName : foundContact.fullName,
		telephone: data.telephone ? data.telephone : foundContact.telephone,
		email: data.email ? data.email : foundContact.email
	});

	await contactRepository.save(updatedContact);

	return updatedContact;
};

export default updateContactService;
