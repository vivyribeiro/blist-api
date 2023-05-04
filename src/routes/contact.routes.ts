import { Router } from "express";
import {
	updateContactController,
	deleteContactController,
	listUserContactsController,
	createUserContactController
} from "../controllers/contacts";
import {
	ensureIsAdminMiddleware,
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware,
	ensurePaginationFormatMiddleware,
	ensureIsSameUserOrAdminMiddleware
} from "../middlewares";
import { ensureUserExistsMiddleware } from "../middlewares/users";
import { ensureContactExistsMiddleware } from "../middlewares/contacts";
import { createContactSchema, updateContactSchema } from "../schemas/contacts";
import { verifyContactEmailOrTelephoneExistsMiddleware } from "../middlewares/contacts";

const contactRoutes = Router();

contactRoutes.post(
	"/",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	ensureDataIsValidMiddleware(createContactSchema),
	verifyContactEmailOrTelephoneExistsMiddleware,
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
	ensureDataIsValidMiddleware(updateContactSchema),
	verifyContactEmailOrTelephoneExistsMiddleware,
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
