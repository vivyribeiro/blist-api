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
		throw new AppError(
			`Invalid field(s)! Must contains at least one of those fields: ${updateUserSchema
				.keyof()
				.options.join(", ")}`,
			401
		);
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
