import { Router } from "express";
import {
	updateContactController,
	deleteContactController,
	listUserContactsController,
	createUserContactController
} from "../controllers/contacts";
import {
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware,
	ensurePaginationFormatMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureEmailOrTelephoneExistsMiddleware,
	ensureIsAdminMiddleware
} from "../middlewares";
import { ensureUserExistsMiddleware } from "../middlewares/users";
import { ensureContactExistsMiddleware } from "../middlewares/contacts";
import { createContactSchema, updateContactSchema } from "../schemas/contacts";

const contactRoutes = Router();

contactRoutes.post(
	"/",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureDataIsValidMiddleware(createContactSchema),
	ensureEmailOrTelephoneExistsMiddleware,
	createUserContactController
);

contactRoutes.get(
	"/",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsAdminMiddleware,
	ensurePaginationFormatMiddleware,
	listUserContactsController
);

contactRoutes.patch(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureContactExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureDataIsValidMiddleware(updateContactSchema),
	ensureEmailOrTelephoneExistsMiddleware,
	updateContactController
);

contactRoutes.delete(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureContactExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	deleteContactController
);

export default contactRoutes;
