import { userRepository } from "../../repositories";
import { responseUserSchema } from "../../schemas/users";
import { iUser, iUserCreate, iUserResponse } from "../../interfaces/users";

const createUserService = async (
	userData: iUserCreate
): Promise<iUserResponse> => {
	const user: iUser = userRepository.create(userData);
	await userRepository.save(user);

	return responseUserSchema.parse(user);
};

export default createUserService;
