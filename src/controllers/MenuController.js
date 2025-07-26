import path from "path";
import fs from "fs";
import { projectRoot } from "../utils/pathHelper.js";

class MenuController {
  constructor(model, validator) {
    this._model = model;
    this._validator = validator;

    this.postNewMenuHandler = this.postNewMenuHandler.bind(this);
    this.deleteMenuByIdHandler = this.deleteMenuByIdHandler.bind(this);
    this.getAllMenusHandler = this.getAllMenusHandler.bind(this);
    this.getMenuByIdHandler = this.getMenuByIdHandler.bind(this);
    this.putMenuByIdHandler = this.putMenuByIdHandler.bind(this);
  }

  async postNewMenuHandler(req, res) {
    const { body, file } = req;

    this._validator.validate(body, file);

    const image = `/assets/menus/${file.filename}`;
    const menuId = await this._model.insertNewMenus({
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

  async getAllMenusHandler(req, res) {
    const menus = await this._model.selectAllMenus();

    return res.status(200).json({
      status: "success",
      data: {
        menus,
      },
    });
  }

  async getMenuByIdHandler(req, res) {
    const { id } = req.params;
    const menu = await this._model.selectImageMenuById(id);

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

    const { image } = await this._model.selectImageMenuById(id);

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

    await this._model.updateMenuById(id, updatedMenu);

    return res.status(200).json({
      status: "success",
      message: "Success updated menu",
    });
  }

  async deleteMenuByIdHandler(req, res) {
    const { id } = req.params;
    const selectedImage = await this._model.selectImageMenuById(id);

    if (selectedImage.image) {
      const fullPathImage = path.join(
        projectRoot,
        selectedImage.image.replace("/assets", "public")
      );

      if (fs.existsSync(fullPathImage)) {
        fs.unlinkSync(fullPathImage);
      }
    }

    await this._model.deleteMenuById(id);
    return res.status(200).json({
      status: "success",
      message: "Success deleted menu",
    });
  }
}

export default MenuController;
