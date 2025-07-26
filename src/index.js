import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import ClientError from "./exceptions/ClientError.js";
import restaurantRouter from "./routes/restaurants.js";
import menuRouter from "./routes/menus.js";
import userRouter from "./routes/users.js";
import path from "path";
import { projectRoot } from "./utils/pathHelper.js";

const app = express();
const port = process.env.PORT || 6000;
const host = process.env.HOST || "localhost";

pool
  .connect()
  .then(() => console.log("Success connect database"))
  .catch((err) => console.error(err.message));

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/assets/menus",
  express.static(path.join(projectRoot, "public", "menus"))
);
app.use(
  "/assets/profile",
  express.static(path.join(projectRoot, "public", "profiles"))
);

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

// Defining routes
app.use("/api/restaurants", restaurantRouter);
app.use("/api/menus", menuRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server running in http://${host}:${port}`);
});
