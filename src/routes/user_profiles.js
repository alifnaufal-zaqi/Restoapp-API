import pool from "../config/db.js";
import UserProfileController from "../controllers/UserProfileController.js";
import UserProfilesModels from "../models/UserProfilesModels.js";
import { UserProfileValidator } from "../validator/user-profiles/index.js";
import upload from "../middleware/multer.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { TokenManager } from "../tokenize/TokenManager.js";
import AsyncHandler from "../utils/asyncFn.js";

const router = express.Router();
const userProfileModels = new UserProfilesModels(pool);
const userProfileController = new UserProfileController(
  userProfileModels,
  UserProfileValidator,
  TokenManager
);

router.get(
  "/",
  verifyToken,
  new AsyncHandler(userProfileController.getUserProfileByIdUserHandler).handle()
);

router.put(
  "/",
  verifyToken,
  upload.single("photoProfile"),
  new AsyncHandler(userProfileController.putUserProfileHandler).handle()
);

export default router;
