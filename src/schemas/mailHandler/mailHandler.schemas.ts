import { userSchema } from "../users";

const resetPasswordSchema = userSchema.pick({
	email: true
});

const updateResetPasswordSchema = userSchema.pick({
	password: true
});

export { updateResetPasswordSchema, resetPasswordSchema };
