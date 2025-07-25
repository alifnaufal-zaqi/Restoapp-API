import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import RestaurantController from "../controllers/RestaurantController.js";
import RestaurantModels from "../models/RestaurantsModels.js";
import { RestaurantValidator } from "../validator/restaurants/index.js";
import pool from "../config/db.js";

const router = express.Router();
const restaurantModels = new RestaurantModels(pool);
const restaurantController = new RestaurantController(
  restaurantModels,
  RestaurantValidator
);

router.post(
  "/",
  new AsyncHandler(restaurantController.postNewRestaurantHandler).handle()
);

router.get(
  "/",
  new AsyncHandler(restaurantController.getAllRestaurantsHandler).handle()
);

router.get(
  "/:id",
  new AsyncHandler(restaurantController.getRestaurantByIdHandler).handle()
);

router.put(
  "/:id",
  new AsyncHandler(restaurantController.putRestaurantByIdHandler).handle()
);

router.delete(
  "/:id",
  new AsyncHandler(restaurantController.deleteRestaurantByIdHandler).handle()
);

export default router;
