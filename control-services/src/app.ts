import "reflect-metadata";
import express from "express";
import logger from "./utils/logger";

import swaggerJSDoc from "swagger-jsdoc";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import cors from "cors";

import { Routes } from "./interfaces/IRoutes";
import { errorHandler } from "./api/middlewares/errorMiddleware";
import { PrismaClient } from "@prisma/client";
import { limiter } from "./utils/redisClient";
import { ServicesRoutes } from "./api/routes/ServicesRoutes";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = "development"; //NODE_ENV || 'development'
    this.port = 3001; //PORT || 3000;

    new PrismaClient();

    this.initializeMiddlewares();
    this.initializeRoutes([new ServicesRoutes()]);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:3001"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(limiter);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

//https://github.com/ljlm0402/typescript-express-starter
