import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { UserRole } from "../../interfaces/users/users.interfaces";
import { responseUserSchema, updateUserSchema } from "../../schemas/users";
import { iUser, iUserResponse, iUserUpdate } from "../../interfaces/users";

const updateUserService = async (
	data: iUserUpdate,
	foundUser: iUser,
	reqRole: string
): Promise<iUserResponse> => {
	if (!Object.keys(data).length) {
		if (reqRole !== UserRole.ADMIN) {
			throw new AppError(
				`Invalid field(s)! Must contains at least one of those fields: ${updateUserSchema
					.keyof()
					.options.slice(0, 3)
					.join(", ")}`,
				401
			);
		}

		throw new AppError(
			`Invalid field(s)! Must contains at least one of those fields: ${updateUserSchema
				.keyof()
				.options.join(", ")}`,
			401
		);
	}

	if (reqRole !== UserRole.ADMIN && Object.keys(data).includes("deletedAt")) {
		throw new AppError(
			"You do not have permission to perform this action.",
			403
		);
	} else {
		await userRepository.recover(foundUser);
	}

	const updatedUser = userRepository.create({
		...foundUser,
		fullName: data.fullName ? data.fullName : foundUser.fullName,
		telephone: data.telephone ? data.telephone : foundUser.telephone,
		email: data.email ? data.email : foundUser.email,
		password: data.password ? data.password : foundUser.password
	});

	await userRepository.save(updatedUser);

	return responseUserSchema.parse(updatedUser);
};

export default updateUserService;
