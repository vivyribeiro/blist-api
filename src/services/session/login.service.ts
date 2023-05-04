import "dotenv/config";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { userLoginSchema } from "../../schemas/session";
import { iLogin, iUserLogin } from "../../interfaces/session";
import { sendConfirmationEmailService } from "../mailHandler";

const loginService = async ({
	email,
	password
}: iLogin): Promise<iUserLogin> => {
	const user = await userRepository.findOne({
		where: {
			email
		},
		withDeleted: true,
		relations: {
			contacts: true
		}
	});

	if (!user) {
		throw new AppError("The email or password is invalid", 401);
	}

	if (user.deletedAt) {
		await userRepository.recover(user);
	}

	if (!user.isEmailVerified) {
		await sendConfirmationEmailService(user);

		throw new AppError("Pending account. Please verify your e-mail!", 401);
	}

	const passwordMatch = await compare(password, user.password);

	if (!passwordMatch) {
		throw new AppError("The email or password is invalid", 401);
	}

	const token = jwt.sign(
		{
			role: user.role,
			deletedAt: user.deletedAt
		},
		process.env.SECRET_KEY!,
		{
			subject: user.id,
			expiresIn: "24h"
		}
	);

	return userLoginSchema.parse({
		token,
		user
	});
};

export default loginService;
