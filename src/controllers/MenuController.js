import path from "path";
import fs from "fs";
import { projectRoot } from "../utils/pathHelper.js";

class MenuController {
  constructor(menusModel, restaurantModel, validator, tokenManager) {
    this._menusModel = menusModel;
    this._validator = validator;
    this._restaurantModel = restaurantModel;
    this._tokenManager = tokenManager;

    this.postNewMenuHandler = this.postNewMenuHandler.bind(this);
    this.deleteMenuByIdHandler = this.deleteMenuByIdHandler.bind(this);
    this.getAllMenusByIdRestaurantHandler =
      this.getAllMenusByIdRestaurantHandler.bind(this);
    this.getMenuByIdHandler = this.getMenuByIdHandler.bind(this);
    this.putMenuByIdHandler = this.putMenuByIdHandler.bind(this);
  }

  async postNewMenuHandler(req, res) {
    const { body, file } = req;

    this._validator.validate(body, file);

    const image = `/assets/menus/${file.filename}`;
    const menuId = await this._menusModel.insertNewMenus({
      ...body,
      image,
    });

    return res.status(201).json({
      status: "success",
      data: {
        menuId,
      },
    });
  }

  async getAllMenusByIdRestaurantHandler(req, res) {
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;
    const idRestaurant = await this._restaurantModel.selectRestaurantByIdUser(
      id_user
    );
    const menus = await this._menusModel.selectAllMenusByIdRestaurant(
      idRestaurant
    );

    return res.status(200).json({
      status: "success",
      data: {
        menus,
      },
    });
  }

  async getMenuByIdHandler(req, res) {
    const { id } = req.params;
    const menu = await this._menusModel.selectImageMenuById(id);

    return res.status(200).json({
      status: "success",
      data: {
        menu,
      },
    });
  }

  async putMenuByIdHandler(req, res) {
    const { body, file } = req;
    const { id } = req.params;

    this._validator.validate(body, file);

    const { image } = await this._menusModel.selectImageMenuById(id);

    if (image) {
      const oldImagePath = path.join(
        projectRoot,
        image.replace("/assets", "public")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const newImageMenu = `/assets/menus/${file.filename}`;
    const updatedMenu = {
      ...body,
      image: newImageMenu,
    };

    await this._menusModel.updateMenuById(id, updatedMenu);

    return res.status(200).json({
      status: "success",
      message: "Success updated menu",
    });
  }

  async deleteMenuByIdHandler(req, res) {
    const { id } = req.params;
    const selectedImage = await this._menusModel.selectImageMenuById(id);

    if (selectedImage.image) {
      const fullPathImage = path.join(
        projectRoot,
        selectedImage.image.replace("/assets", "public")
      );

      if (fs.existsSync(fullPathImage)) {
        fs.unlinkSync(fullPathImage);
      }
    }

    await this._menusModel.deleteMenuById(id);
    return res.status(200).json({
      status: "success",
      message: "Success deleted menu",
    });
  }
}

export default MenuController;
