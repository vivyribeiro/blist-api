import { Router } from "express";
import {
	resetPasswordSchema,
	updateResetPasswordSchema
} from "../schemas/mailHandler";
import {
	userResetPasswordController,
	userConfirmationEmailController,
	sendResetPasswordEmailController
} from "../controllers/mailHandler";
import { ensureDataIsValidMiddleware } from "../middlewares";

const mailHandlerRoutes = Router();

mailHandlerRoutes.post(
	"/reset_password",
	ensureDataIsValidMiddleware(resetPasswordSchema),
	sendResetPasswordEmailController
);
mailHandlerRoutes.patch(
	"/reset_password/:token",
	ensureDataIsValidMiddleware(updateResetPasswordSchema),
	userResetPasswordController
);

mailHandlerRoutes.get("/confirm_email/:token", userConfirmationEmailController);

export default mailHandlerRoutes;
