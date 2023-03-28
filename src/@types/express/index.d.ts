import { iContactResponse } from "../../interfaces/contacts";
import { iUser, paginationList } from "../../interfaces/users";
import { UserRole } from "../../interfaces/users/users.interfaces";

declare global {
	namespace Express {
		interface Request {
			user: {
				id: string;
				role: UserRole;
				deletedAt: string | null;
			};
			foundUser: iUser;
			foundContact: iContactResponse;
			listPagination: paginationList;
		}
	}
}
