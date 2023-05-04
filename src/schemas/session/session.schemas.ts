import { z } from "zod";
import { userReportSchema } from "../users";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

const tokenSchema = z.object({
	token: z.string()
});

const userLoginSchema = tokenSchema.extend({
	user: userReportSchema
});

export { loginSchema, tokenSchema, userLoginSchema };
