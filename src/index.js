import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import ClientError from "./exceptions/ClientError.js";
import restaurantRouter from "./routes/restaurants.js";

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

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded());

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
app.use("/restaurants", restaurantRouter);

app.listen(port, () => {
  console.log(`Server running in http://${host}:${port}`);
});
