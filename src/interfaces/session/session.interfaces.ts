import { z } from "zod";
import { loginSchema, tokenSchema } from "../../schemas/session";

type iLogin = z.infer<typeof loginSchema>;

type iToken = z.infer<typeof tokenSchema>;

export { iLogin, iToken };
