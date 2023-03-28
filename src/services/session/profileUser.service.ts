import { responseUserSchema } from "../../schemas/users";
import { iUser, iUserResponse } from "../../interfaces/users";

const profileUserService = async (foundUser: iUser): Promise<iUserResponse> => {
	return responseUserSchema.parse(foundUser);
};

export default profileUserService;
