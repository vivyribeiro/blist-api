import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import { routes } from "./routes";

const app: Application = express();
app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;
