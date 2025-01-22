import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";

// import { initDB } from "./app/common/services/database.service";
// import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
// import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import { apiLimiter } from "./app/common/middleware/rate-limiter.middleware";

loadConfig();
import AppDataSource from "./app/common/services/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });


const port = process.env.PORT ?? 5000;

const app: Express = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

const initApp = async (): Promise<void> => {
  // init mongodb
  // await initDB();

  // // passport init
  // initPassport();

  // set base path to /api
  app.use("/api", apiLimiter,routes);

  app.get("/", apiLimiter, (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });



  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is runnuing on port", port);
  });
};

void initApp();
