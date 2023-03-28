import { Router } from "express";
import {
	updateContactController,
	deleteContactController,
	listUserContactsController,
	createUserContactsController
} from "../controllers/contacts";
import {
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware,
	ensurePaginationFormatMiddleware,
	ensureIsSameUserOrAdminMiddleware
} from "../middlewares";
import {
	ensureContactExistsMiddleware,
	ensureContastsEmailOrTelephoneExistsMiddleware
} from "../middlewares/contacts";
import { ensureUserExistsMiddleware } from "../middlewares/users";
import { createContactsSchema, updateContactSchema } from "../schemas/contacts";

const contactRoutes = Router();

contactRoutes.post(
	"/",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureDataIsValidMiddleware(createContactsSchema),
	ensureContastsEmailOrTelephoneExistsMiddleware,
	createUserContactsController
);

contactRoutes.get(
	"/",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensurePaginationFormatMiddleware,
	listUserContactsController
);

contactRoutes.patch(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureContactExistsMiddleware,
	ensureIsSameUserOrAdminMiddleware,
	ensureDataIsValidMiddleware(updateContactSchema),
	ensureContastsEmailOrTelephoneExistsMiddleware,
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
