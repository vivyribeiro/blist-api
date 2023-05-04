import "express-async-errors";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import { errorHandler } from "./errors/errors";
import swaggerDocument from "../documentation/swagger.json";

const app: Application = express();
app.use(express.json());

app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/swagger", (request, response) => {
	return response.sendFile(process.cwd() + "/documentation/swagger.json");
});

app.get("/", (request, response) => {
	return response.sendFile(process.cwd() + "/documentation/index.html");
});

app.use(routes);

app.use(errorHandler);

export default app;
