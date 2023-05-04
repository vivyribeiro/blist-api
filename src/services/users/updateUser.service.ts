import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { responseUserSchema, updateUserSchema } from "../../schemas/users";
import { iUser, iUserResponse, iUserUpdate } from "../../interfaces/users";

const updateUserService = async (
	data: iUserUpdate,
	foundUser: iUser
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
		email: data.email ? data.email : foundUser.email,
		fullName: data.fullName ? data.fullName : foundUser.fullName,
		password: data.password ? data.password : foundUser.password,
		telephone: data.telephone ? data.telephone : foundUser.telephone
	});

	await userRepository.save(updatedUser);

	return responseUserSchema.parse(updatedUser);
};

export default updateUserService;
