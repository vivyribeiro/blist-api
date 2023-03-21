import { Router } from "express";

const contactRoutes = Router();

contactRoutes.post("/");
contactRoutes.get("/");
contactRoutes.get("/:uuid");
contactRoutes.patch("/:uuid");
contactRoutes.delete("/:uuid");

export default contactRoutes;
