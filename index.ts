import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors"

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
// import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import { apiLimiter } from "./app/common/middleware/rate-limiter.middleware";

loadConfig();


const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();


app.use(cors());

// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
//   res.sendStatus(204); // No content
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

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
