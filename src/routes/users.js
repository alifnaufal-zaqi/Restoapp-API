import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import pool from "../config/db.js";
import UserController from "../controllers/UserController.js";
import UsersModels from "../models/UsersModels.js";
import { UserValidator } from "../validator/users/index.js";

const router = express.Router();

const usersModels = new UsersModels(pool);
const userController = new UserController(usersModels, UserValidator);

router.post(
  "/user/register",
  new AsyncHandler(userController.postNewUserHandler("user")).handle()
);

router.post(
  "/vendor/register",
  new AsyncHandler(userController.postNewUserHandler("vendor")).handle()
);

router.post(
  "/admin/register",
  new AsyncHandler(userController.postNewUserHandler("admin")).handle()
);

export default router;
