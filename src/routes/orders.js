import express from "express";
import pool from "../config/db.js";
import OrdersModels from "../models/OrdersModels.js";
import OrderController from "../controllers/OrderController.js";
import OrderItemsModel from "../models/OrderItemsModels.js";
import OrderItemController from "../controllers/OrderItemController.js";
import RestaurantModels from "../models/RestaurantsModels.js";
import { OrderPayloadValidator } from "../validator/orders/index.js";
import AsyncHandler from "../utils/asyncFn.js";
import verifyToken from "../middleware/verifyToken.js";
import { TokenManager } from "../tokenize/TokenManager.js";
import { isVendor } from "../middleware/checkRole.js";

const router = express.Router();
const ordersModels = new OrdersModels(pool);
const orderItemsModels = new OrderItemsModel(pool);
const restaurantModel = new RestaurantModels(pool);
const orderController = new OrderController(
  ordersModels,
  orderItemsModels,
  OrderPayloadValidator,
  TokenManager
);
const orderItemController = new OrderItemController(
  orderItemsModels,
  restaurantModel,
  TokenManager
);

router.post(
  "/",
  verifyToken,
  new AsyncHandler(orderController.postNewOrder).handle()
);

router.put(
  "/paid/:id",
  verifyToken,
  new AsyncHandler(
    orderController.putStatusPaymentOrderHandler("status-1")
  ).handle()
);

router.put(
  "/cancelled/:id",
  verifyToken,
  new AsyncHandler(
    orderController.putStatusPaymentOrderHandler("status-3")
  ).handle()
);

router.get(
  "/:id",
  verifyToken,
  new AsyncHandler(orderController.getOrderById).handle()
);

router.get(
  "/",
  verifyToken,
  new AsyncHandler(orderController.getOrderByIdUser).handle()
);

router.get(
  "/items",
  verifyToken,
  isVendor,
  new AsyncHandler(orderItemController.getOrderItemByIdRestaurant).handle()
);

export default router;
