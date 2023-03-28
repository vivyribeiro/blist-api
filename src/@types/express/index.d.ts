import { iContactResponse } from "../../interfaces/contacts";
import { iUser, paginationList } from "../../interfaces/users";

declare global {
	namespace Express {
		interface Request {
			user: {
				id: string;
				role: "admin" | "client";
				deletedAt: string | null;
			};
			foundUser: iUser;
			foundContact: iContactResponse;
			listPagination: paginationList;
		}
	}
}
