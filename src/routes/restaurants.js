import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import RestaurantController from "../controllers/RestaurantController.js";
import RestaurantModels from "../models/RestaurantsModels.js";
import MenusModels from "../models/MenusModels.js";
import { RestaurantValidator } from "../validator/restaurants/index.js";
import verifyToken from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/checkRole.js";
import pool from "../config/db.js";

const router = express.Router();
const menusModels = new MenusModels(pool);
const restaurantModels = new RestaurantModels(pool);
const restaurantController = new RestaurantController(
  restaurantModels,
  menusModels,
  RestaurantValidator
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  new AsyncHandler(restaurantController.postNewRestaurantHandler).handle()
);

router.get(
  "/",
  verifyToken,
  new AsyncHandler(restaurantController.getAllRestaurantsHandler).handle()
);

router.get(
  "/:id",
  verifyToken,
  new AsyncHandler(restaurantController.getRestaurantByIdHandler).handle()
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  new AsyncHandler(restaurantController.putRestaurantByIdHandler).handle()
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  new AsyncHandler(restaurantController.deleteRestaurantByIdHandler).handle()
);

export default router;
