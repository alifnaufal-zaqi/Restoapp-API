import path from "path";
import fs from "fs";
import { projectRoot } from "../utils/pathHelper.js";

class RestaurantController {
  constructor(model, menuModel, validator) {
    this._model = model;
    this._menuModel = menuModel;
    this._validator = validator;

    // Binding Method
    this.postNewRestaurantHandler = this.postNewRestaurantHandler.bind(this);
    this.getAllRestaurantsHandler = this.getAllRestaurantsHandler.bind(this);
    this.getRestaurantByIdHandler = this.getRestaurantByIdHandler.bind(this);
    this.putRestaurantByIdHandler = this.putRestaurantByIdHandler.bind(this);
    this.deleteRestaurantByIdHandler =
      this.deleteRestaurantByIdHandler.bind(this);
  }

  async postNewRestaurantHandler(req, res) {
    const { body, file } = req;

    this._validator.validate(body, file);

    const restaurantImage = `/assets/restaurants/${file.filename}`;
    const restaurantId = await this._model.insertNewRestaurant({
      ...body,
      restaurantImage,
    });

    return res.status(201).json({
      status: "success",
      data: {
        restaurantId,
      },
    });
  }

  async getAllRestaurantsHandler(req, res) {
    const restaurants = await this._model.selectRestaurants();

    return res.status(200).json({
      status: "success",
      data: {
        restaurants,
      },
    });
  }

  async getRestaurantByIdHandler(req, res) {
    const { id } = req.params;
    const restaurant = await this._model.selectRestaurantById(id);
    const menus = await this._menuModel.selectAllMenusByIdRestaurant(id);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: {
          ...restaurant,
          menus,
        },
      },
    });
  }

  async putRestaurantByIdHandler(req, res) {
    const { body, file, params } = req;
    const { id } = params;

    this._validator.validate(body, file);

    const { restaurant_image: restaurantImage } =
      await this._model.selectRestaurantById(id);

    if (restaurantImage) {
      const oldImagePath = path.join(
        projectRoot,
        restaurantImage.replace("/assets", "public")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const newRestaurantImage = `/assets/restaurants/${file.filename}`;
    const updatedRestaurant = {
      ...body,
      restaurantImage: newRestaurantImage,
    };

    await this._model.updateRestaurantById(id, updatedRestaurant);

    return res.status(200).json({
      status: "success",
      message: "Success updated restaurant",
    });
  }

  async deleteRestaurantByIdHandler(req, res) {
    const { id } = req.params;
    const { restaurant_image: restaurantImage } =
      await this._model.selectRestaurantById(id);

    if (restaurantImage) {
      const fullPathImage = path.join(
        projectRoot,
        restaurantImage.replace("/assets", "public")
      );

      if (fs.unlinkSync(fullPathImage)) {
        fs.unlinkSync(fullPathImage);
      }
    }

    await this._model.deleteRestaurantById(id);

    return res.status(200).json({
      status: "success",
      message: "Succes deleted restaurant",
    });
  }
}

export default RestaurantController;
