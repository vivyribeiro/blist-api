import { paginationList } from "../../interfaces/users";
import { listContactsSchema } from "../../schemas/contacts";

const listUserContactsService = async (
	list: paginationList
): Promise<paginationList> => {
	return list;
};

export default listUserContactsService;
