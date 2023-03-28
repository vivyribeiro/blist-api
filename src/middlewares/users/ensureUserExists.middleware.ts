import { AppError } from "../../errors";
import { iUser } from "../../interfaces/users";
import { userRepository } from "../../repositories";
import { NextFunction, Request, Response } from "express";
import { validIdSchema } from "../../schemas/users/users.schemas";

const ensureUserExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const id: string = req.params.id || req.user.id;

	validIdSchema.parse({ id });

	const foundUser: iUser | null = await userRepository.findOne({
		where: {
			id
		},
		withDeleted: true
	});

	if (!foundUser) {
		throw new AppError("User was not found.", 404);
	}

	req.foundUser = foundUser;

	return next();
};

export default ensureUserExistsMiddleware;
