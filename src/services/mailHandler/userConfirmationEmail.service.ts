import "dotenv/config";
import jwt from "jsonwebtoken";
import { Like } from "typeorm";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";

const userConfirmationEmailService = async (token: string): Promise<string> => {
	if (!token) {
		throw new AppError("Token was not found", 404);
	}

	const user = await userRepository.findOne({
		where: {
			confirmationToken: Like(`%${token}%`)
		}
	});

	if (!user) {
		throw new AppError("Invalid link or expired", 401);
	}

	jwt.verify(
		user.confirmationToken!,
		process.env.SECRET_KEY!,
		(error, decoded: any) => {
			if (error) {
				throw new AppError("Invalid link or expired", 401);
			}
		}
	);

	user.isEmailVerified = true;

	await userRepository.save(user);

	return "Email verified successfully";
};

export default userConfirmationEmailService;
