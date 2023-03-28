import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { UserRole } from "../interfaces/users/users.interfaces";

const ensureIsAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	if (req.user.role !== UserRole.ADMIN) {
		throw new AppError(
			"You do not have permission to perform this action.",
			403
		);
	}

	return next();
};

export default ensureIsAdminMiddleware;
