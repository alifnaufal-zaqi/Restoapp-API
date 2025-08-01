import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import MenuController from "../controllers/MenuController.js";
import MenusModels from "../models/MenusModels.js";
import { MenusValidator } from "../validator/menus/index.js";
import RestaurantModels from "../models/RestaurantsModels.js";
import { TokenManager } from "../tokenize/TokenManager.js";
import pool from "../config/db.js";
import upload from "../middleware/multer.js";
import { isVendor } from "../middleware/checkRole.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
const menuModel = new MenusModels(pool);
const restaurantModel = new RestaurantModels(pool);
const menuController = new MenuController(
  menuModel,
  restaurantModel,
  MenusValidator,
  TokenManager
);

router.post(
  "/",
  verifyToken,
  isVendor,
  upload.single("image"),
  new AsyncHandler(menuController.postNewMenuHandler).handle()
);

router.get(
  "/",
  verifyToken,
  new AsyncHandler(menuController.getAllMenusByIdRestaurantHandler).handle()
);

router.get(
  "/:id",
  verifyToken,
  new AsyncHandler(menuController.getMenuByIdHandler).handle()
);

router.put(
  "/:id",
  verifyToken,
  isVendor,
  upload.single("image"),
  new AsyncHandler(menuController.putMenuByIdHandler).handle()
);

router.delete(
  "/:id",
  verifyToken,
  isVendor,
  new AsyncHandler(menuController.deleteMenuByIdHandler).handle()
);

export default router;
