class RestaurantController {
  constructor(model, validator) {
    this._model = model;
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
    this._validator.validate(req.body);
    const { restaurantName, latitude, longitude, idUser } = req.body;
    const restaurantId = await this._model.insertNewRestaurant({
      restaurantName,
      latitude,
      longitude,
      idUser,
    });

    return res.status(201).json({
      status: "success",
      data: {
        restaurantId,
      },
    });
  }

  async getAllRestaurantsHandler(req, res) {
    const restaurants = await this._model.selectRestaurant();

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

    res.status(200).json({
      status: "success",
      data: {
        restaurant,
      },
    });
  }

  async putRestaurantByIdHandler(req, res) {
    this._validator.validate(req.body);
    const { restaurantName, latitude, longitude } = req.body;
    const { id } = req.params;

    await this._model.updateRestaurantById(id, {
      restaurantName,
      latitude,
      longitude,
    });

    return res.status(200).json({
      status: "success",
      message: "Success updated restaurant",
    });
  }

  async deleteRestaurantByIdHandler(req, res) {
    const { id } = req.params;

    await this._model.deleteRestaurantById(id);

    return res.status(200).json({
      status: "success",
      message: "Succes deleted restaurant",
    });
  }
}

export default RestaurantController;
