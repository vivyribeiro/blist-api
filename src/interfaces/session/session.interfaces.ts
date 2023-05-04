import { z } from "zod";
import {
	loginSchema,
	tokenSchema,
	userLoginSchema
} from "../../schemas/session";
import { iUserReport } from "../users";

type iLogin = z.infer<typeof loginSchema>;

type iToken = z.infer<typeof tokenSchema>;

type iUserLogin = z.infer<typeof userLoginSchema>;

export { iLogin, iToken, iUserLogin };
