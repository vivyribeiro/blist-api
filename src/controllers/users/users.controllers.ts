import { Request, Response } from "express";
import {
	listUsersService,
	createUserService,
	updateUserService,
	softDeleteUserService
} from "../../services/users";
import {
	iUser,
	iUserCreate,
	iUserUpdate,
	paginationList
} from "../../interfaces/users";

const createUserController = async (req: Request, res: Response) => {
	const userData: iUserCreate = req.body;

	const newUser = await createUserService(userData);

	return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
	const listPagination = req.listPagination;

	const usersPagination: paginationList = await listUsersService(
		listPagination
	);

	return res.json(usersPagination);
};

const updateUserController = async (req: Request, res: Response) => {
	const userData: iUserUpdate = req.body;
	const reqRole: string = req.user.role;
	const foundUser: iUser = req.foundUser;

	const updatedUser = await updateUserService(userData, foundUser, reqRole);

	return res.json(updatedUser);
};

const softDeleteUserController = async (req: Request, res: Response) => {
	const foundUser = req.foundUser;

	await softDeleteUserService(foundUser);

	return res.status(204).json();
};

export {
	listUsersController,
	createUserController,
	updateUserController,
	softDeleteUserController
};
