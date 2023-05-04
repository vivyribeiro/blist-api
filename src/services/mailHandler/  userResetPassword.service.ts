import "dotenv/config";
import jwt from "jsonwebtoken";
import { Like } from "typeorm";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { iUserResetPasswordService } from "../../interfaces/mailHandler";

const userResetPasswordService = async ({
	password,
	token
}: iUserResetPasswordService): Promise<string> => {
	if (!token) {
		throw new AppError("Token was not found", 404);
	}

	const user = await userRepository.findOne({
		where: {
			resetToken: Like(`%${token}%`)
		}
	});

	if (!user) {
		throw new AppError("Invalid link or expired");
	}

	jwt.verify(
		user.resetToken!,
		process.env.SECRET_KEY!,
		(error, decoded: any) => {
			if (error) {
				throw new AppError("Invalid link or expired");
			}
		}
	);

	user.password = password;
	user.resetToken = null;

	await userRepository.save(user);

	return "Password successfully updated";
};

export default userResetPasswordService;
