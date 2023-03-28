import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { UserRole } from "../interfaces/users/users.interfaces";

const ensureIsSameUserOrAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	if (req.user.role !== UserRole.ADMIN && req.foundUser.id !== req.user.id) {
		throw new AppError(
			"You do not have permission to perform this action.",
			403
		);
	}

	return next();
};

export default ensureIsSameUserOrAdminMiddleware;
