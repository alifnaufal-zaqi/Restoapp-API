import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class RestaurantModels {
  constructor(pool) {
    this._pool = pool;
  }

  async insertNewRestaurant({ restaurantName, latitude, longitude }) {
    const idRestaurant = `restaurant-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO restaurants VALUES ($1, $2, $3, $4) RETURNING id_restaurant",
      values: [idRestaurant, restaurantName, latitude, longitude],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_restaurant) {
      throw new InvariantError("Failed adding new restautant");
    }

    return result.rows[0].id_restaurant;
  }

  async selectRestaurant() {
    const restaurants = await this._pool.query("SELECT * FROM restaurants");

    return restaurants.rows;
  }

  async selectRestaurantById(id) {
    const query = {
      text: "SELECT * FROM restaurants WHERE id_restaurant = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError("Restaurant not found");
    }

    return result.rows[0];
  }

  async updateRestaurantById(id, { restaurantName, latitude, longitude }) {
    const query = {
      text: "UPDATE restaurants SET restaurant_name = $1, latitude = $2, longitude = $3 WHERE id_restaurant = $4 RETURNING id_restaurant",
      values: [restaurantName, latitude, longitude, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Failed updated restaurant");
    }
  }

  async deleteRestaurantById(id) {
    const query = {
      text: "DELETE FROM restaurants WHERE id_restaurant = $1 RETURNING id_restaurant",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Failed deleted restaurant");
    }
  }
}

export default RestaurantModels;
