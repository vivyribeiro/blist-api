import { Router } from "express";
import {
	listUsersController,
	createUserController,
	updateUserController,
	softDeleteUserController
} from "../controllers/users";
import {
	ensureIsAdminMiddleware,
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware,
	ensurePaginationFormatMiddleware,
	ensureIsSameUserOrAdminMiddleware
} from "../middlewares";
import {
	ensureUserExistsMiddleware,
	ensureUserEmailOrTelephoneExistsMiddleware
} from "../middlewares/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";

const userRoutes = Router();

userRoutes.post(
	"/",
	ensureDataIsValidMiddleware(createUserSchema),
	ensureUserEmailOrTelephoneExistsMiddleware,
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

userRoutes.patch(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureDataIsValidMiddleware(updateUserSchema),
	ensureUserEmailOrTelephoneExistsMiddleware,
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
