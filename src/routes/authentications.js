import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import pool from "../config/db.js";
import AuthenticationController from "../controllers/AuthenticationController.js";
import AuthenticationsModels from "../models/AuthenticationsModels.js";
import UserModels from "../models/UsersModels.js";
import { AuthenticationValidator } from "../validator/authentications/index.js";
import { TokenManager } from "../tokenize/TokenManager.js";

const router = express.Router();
const userModels = new UserModels(pool);

const authenticationModel = new AuthenticationsModels(pool);
const authenticationController = new AuthenticationController(
  userModels,
  authenticationModel,
  TokenManager,
  AuthenticationValidator
);

router.post(
  "/",
  new AsyncHandler(authenticationController.postAuthenticationHandler).handle()
);

router.put(
  "/",
  new AsyncHandler(authenticationController.putAuthenticationHandler).handle()
);

router.delete(
  "/",
  new AsyncHandler(
    authenticationController.deleteAuthenticationHandler
  ).handle()
);

export default router;
