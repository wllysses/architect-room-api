import express from "express";
import cors from "cors";
import { ErrorHandlingMiddleware } from "./middlewares/error-handling.middleware";
import { router } from "./routes/routes";

export const app: express.Application = express();

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", router);

// error handling middleware
app.use(new ErrorHandlingMiddleware().handler);
