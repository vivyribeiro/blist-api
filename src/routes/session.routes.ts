import { Router } from "express";
import { loginSchema } from "../schemas/session";
import { ensureUserExistsMiddleware } from "../middlewares/users";
import {
	profileUserController,
	sessionController
} from "../controllers/session";
import {
	ensureDataIsValidMiddleware,
	ensureTokenIsValidMiddleware
} from "../middlewares";

const sessionRoutes = Router();

sessionRoutes.post(
	"/login",
	ensureDataIsValidMiddleware(loginSchema),
	sessionController
);

sessionRoutes.get(
	"/profile",
	ensureTokenIsValidMiddleware,
	ensureUserExistsMiddleware,
	profileUserController
);

export default sessionRoutes;
