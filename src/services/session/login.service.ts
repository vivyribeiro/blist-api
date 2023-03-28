import "dotenv/config";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { iLogin, iToken } from "../../interfaces/session";

const loginService = async ({ email, password }: iLogin): Promise<iToken> => {
	const user = await userRepository.findOne({
		where: {
			email
		},
		withDeleted: true
	});

	if (!user) {
		throw new AppError("The email or password is invalid", 401);
	}

	if (user.deletedAt) {
		throw new AppError("User is desactive.", 401);
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

	return { token };
};

export default loginService;
