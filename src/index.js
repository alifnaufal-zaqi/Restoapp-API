import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import ClientError from "./exceptions/ClientError.js";
import restaurantRouter from "./routes/restaurants.js";
import menuRouter from "./routes/menus.js";
import userRouter from "./routes/users.js";
import authenticationRouter from "./routes/authentications.js";
import userProfileRouter from "./routes/user_profiles.js";
import path from "path";
import { projectRoot } from "./utils/pathHelper.js";
import NotFoundError from "./exceptions/NotFoundError.js";

const app = express();
const port = process.env.PORT || 6000;
const host = process.env.HOST || "localhost";

pool
  .connect()
  .then(() => console.log("Success connect database"))
  .catch((err) => console.error(err.message));

const corsOption = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/assets/menus",
  express.static(path.join(projectRoot, "public", "menus"))
);
app.use(
  "/assets/profiles",
  express.static(path.join(projectRoot, "public", "profiles"))
);

app.use((req, res, next) => {
  next(new NotFoundError("Route Not Found"));
});

// Defining routes
app.use("/api/restaurants", restaurantRouter);
app.use("/api/menus", menuRouter);
app.use("/api/users", userRouter);
app.use("/api/authentications", authenticationRouter);
app.use("/api/profiles", userProfileRouter);

// Middleware for handle error
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server running in http://${host}:${port}`);
});
