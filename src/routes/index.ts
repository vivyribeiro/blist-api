import { Router } from "express";

import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import contactRoutes from "./contact.routes";

const routes = Router();

routes.use("/", sessionRoutes);
routes.use("/users", userRoutes);
routes.use("/contacts", contactRoutes);

export { routes };
