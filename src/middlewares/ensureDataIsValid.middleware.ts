import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

const ensureDataIsValidMiddleware =
	(schema: ZodTypeAny) =>
	async (req: Request, resp: Response, next: NextFunction) => {
		const validatedData = schema.parse(req.body);

		req.body = validatedData;

		return next();
	};

export default ensureDataIsValidMiddleware;
