import { Router } from "express";

import userRoutes from "./user.routes";
import loginRoutes from "./login.routes";
import contactRoutes from "./contact.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/contacts", contactRoutes);

export { routes };
