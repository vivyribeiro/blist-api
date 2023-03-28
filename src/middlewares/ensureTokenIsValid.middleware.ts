import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import { NextFunction, Request, Response } from "express";

const ensureTokenIsValidMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	let token: string | undefined = req.headers.authorization;

	if (!token) {
		throw new AppError("Missing bearer token", 401);
	}

	token = token?.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		if (error) {
			throw new AppError(error.message, 401);
		}

		req.user = {
			id: decoded.sub,
			role: decoded.role,
			deletedAt: decoded.deletedAt
		};

		return next();
	});
};

export default ensureTokenIsValidMiddleware;
