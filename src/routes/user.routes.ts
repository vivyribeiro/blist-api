import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/");
userRoutes.get("/");
userRoutes.get("/profile");
userRoutes.patch("/:uuid");
userRoutes.delete("/:uuid");

export default userRoutes;
