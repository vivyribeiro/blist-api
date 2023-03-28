import { Request, Response } from "express";
import { iUser } from "../../interfaces/users";
import { iLogin, iToken } from "../../interfaces/session";
import { loginService, profileUserService } from "../../services/session";

const sessionController = async (req: Request, res: Response) => {
	const loginData: iLogin = req.body;
	const token: iToken = await loginService(loginData);

	return res.json(token);
};

const profileUserController = async (req: Request, res: Response) => {
	const foundUser: iUser = req.foundUser;

	const profileUser = await profileUserService(foundUser);

	return res.json(profileUser);
};

export { sessionController, profileUserController };
