import AsyncHandler from "../utils/asyncFn.js";
import express from "express";
import MenuController from "../controllers/MenuController.js";
import MenusModels from "../models/MenusModels.js";
import { MenusValidator } from "../validator/menus/index.js";
import pool from "../config/db.js";
import upload from "../middleware/multer.js";

const router = express.Router();
const menuModel = new MenusModels(pool);
const menuController = new MenuController(menuModel, MenusValidator);

router.post(
  "/",
  upload.single("image"),
  new AsyncHandler(menuController.postNewMenuHandler).handle()
);

router.get("/", new AsyncHandler(menuController.getAllMenusHandler).handle());

router.get(
  "/:id",
  new AsyncHandler(menuController.getMenuByIdHandler).handle()
);

router.put(
  "/:id",
  upload.single("image"),
  new AsyncHandler(menuController.putMenuByIdHandler).handle()
);

router.delete(
  "/:id",
  new AsyncHandler(menuController.deleteMenuByIdHandler).handle()
);

export default router;
