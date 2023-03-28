import { listUsersSchema } from "../schemas/users";
import { NextFunction, Request, Response } from "express";
import { iUsersList, paginationList } from "../interfaces/users";
import { contactRepository, userRepository } from "../repositories";

const ensurePaginationFormatMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { perPage, page } = req.query;
	const url = `${req.protocol}://${req.headers.host + req.baseUrl}`;

	const pageValue: number = !page || +page < 1 || isNaN(+page) ? 1 : +page;
	const perPageValue: number =
		!perPage || +perPage < 1 || +perPage > 2 || isNaN(+perPage) ? 2 : +perPage;

	let list = [],
		quantity: number = 0;

	if (req.baseUrl == "/users") {
		const listUsers: iUsersList = await userRepository.find({
			withDeleted: true,
			take: perPageValue,
			skip: (pageValue - 1) * perPageValue
		});

		list = listUsersSchema.parse(listUsers);
		quantity = await userRepository.count({
			withDeleted: true
		});
	} else {
		list = await contactRepository.find({
			where: {
				user: {
					id: req.foundUser.id
				}
			},
			take: perPageValue,
			skip: (pageValue - 1) * perPageValue
		});

		quantity = await contactRepository.count({
			where: {
				user: {
					id: req.foundUser.id
				}
			}
		});
	}

	const listPagination: paginationList = {
		previousPage:
			pageValue <= 1
				? null
				: `${url}?page=${pageValue - 1}&perPage=${perPageValue}`,
		nextPage:
			quantity / pageValue - perPageValue <= 0
				? null
				: `${url}?page=${pageValue + 1}&perPage=${perPageValue}`,
		count: quantity,
		data: list
	};

	req.listPagination = listPagination;

	next();
};

export default ensurePaginationFormatMiddleware;
