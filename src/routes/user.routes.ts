import { Router } from "express";
import {
	listUsersController,
	createUserController,
	updateUserController,
	softDeleteUserController,
	retrieveUserReportController
} from "../controllers/users";
import {
	ensureIsAdminMiddleware,
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware,
	ensurePaginationFormatMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureEmailOrTelephoneExistsMiddleware
} from "../middlewares";
import { ensureUserExistsMiddleware } from "../middlewares/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";

const userRoutes = Router();

userRoutes.post(
	"/",
	ensureDataIsValidMiddleware(createUserSchema),
	ensureEmailOrTelephoneExistsMiddleware,
	createUserController
);
userRoutes.get(
	"/",
	ensureTokenIsValidMiddleware,
	ensureIsAdminMiddleware,
	ensureUserExistsMiddleware,
	ensurePaginationFormatMiddleware,
	listUsersController
);

userRoutes.get(
	"/:id/report",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	retrieveUserReportController
);

userRoutes.patch(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureDataIsValidMiddleware(updateUserSchema),
	ensureEmailOrTelephoneExistsMiddleware,
	updateUserController
);
userRoutes.delete(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	softDeleteUserController
);

export default userRoutes;
