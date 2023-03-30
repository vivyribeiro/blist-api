import { z } from "zod";
import {
	userSchema,
	listUsersSchema,
	createUserSchema,
	updateUserSchema,
	userReportSchema,
	responseUserSchema
} from "../../schemas/users";
import { iContactsList } from "../contacts";

enum UserRole {
	ADMIN = "admin",
	CLIENT = "client"
}

type iUser = z.infer<typeof userSchema>;

type iUsersList = z.infer<typeof listUsersSchema>;

type iUserCreate = z.infer<typeof createUserSchema>;

type iUserUpdate = z.infer<typeof updateUserSchema>;

type iUserReport = z.infer<typeof userReportSchema>;

type iUserResponse = z.infer<typeof responseUserSchema>;

interface paginationList {
	previousPage: string | null;
	nextPage: string | null;
	count: number;
	data: iUsersList | iContactsList;
}

export {
	iUser,
	UserRole,
	iUsersList,
	iUserUpdate,
	iUserCreate,
	iUserReport,
	iUserResponse,
	paginationList
};
