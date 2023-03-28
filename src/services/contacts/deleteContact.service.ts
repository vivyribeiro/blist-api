import { iContactResponse } from "../../interfaces/contacts";
import { contactRepository } from "../../repositories";

const deleteContactService = async (
	foundContact: iContactResponse
): Promise<void> => {
	await contactRepository.delete(foundContact.id);
};

export default deleteContactService;
