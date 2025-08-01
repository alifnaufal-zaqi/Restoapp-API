import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class MenusModels {
  constructor(pool) {
    this._pool = pool;
  }

  async insertNewMenus({
    idCategory,
    idRestaurant,
    menuName,
    price,
    stock,
    image,
  }) {
    const idMenu = `menu-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO menus (id_menu, id_category, id_restaurant, menu_name, price, stock, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_menu",
      values: [idMenu, idCategory, idRestaurant, menuName, price, stock, image],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_menu) {
      throw new InvariantError("Failed adding new menu");
    }

    return result.rows[0].id_menu;
  }

  async selectImageMenuById(id) {
    const query = {
      text: `SELECT menus.id_menu,
              categories.category_name,
              restaurants.restaurant_name,
              menus.menu_name, menus.price,
              menus.stock,
              menus.image
              FROM menus JOIN categories
              ON menus.id_category = categories.id_category
              JOIN restaurants
              ON menus.id_restaurant = restaurants.id_restaurant
              WHERE id_menu = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Menu not found");
    }

    return result.rows[0];
  }

  // Select all menu owned by restaurant
  async selectAllMenusByIdRestaurant(idRestaurant) {
    const query = {
      text: `SELECT menus.id_menu,
            categories.category_name,
            restaurants.restaurant_name,
            menus.menu_name,
            menus.price,
            menus.stock,
            menus.image
            FROM menus JOIN categories
            ON menus.id_category = categories.id_category
            JOIN restaurants
            ON menus.id_restaurant = restaurants.id_restaurant
            WHERE menus.id_restaurant = $1`,
      values: [idRestaurant],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async selectStockMenuByIdMenu(idMenu) {
    const query = {
      text: "SELECT stock FROM menus WHERE id_menu = $1",
      values: [idMenu],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(`Menu with id ${idMenu} not found`);
    }

    return result.rows[0].stock;
  }

  async updateStockByIdMenu(idMenu, quantity) {
    const query = {
      text: "UPDATE menus SET stock = stock - $1 WHERE id_menu = $2",
      values: [quantity, idMenu],
    };

    await this._pool.query(query);
  }

  async updateMenuById(
    id,
    { idCategory, idRestaurant, menuName, price, stock, image }
  ) {
    const query = {
      text: "UPDATE menus SET id_category = $1, id_restaurant = $2, menu_name = $3, price = $4, stock = $5, image = $6 WHERE id_menu = $7 RETURNING id_menu",
      values: [idCategory, idRestaurant, menuName, price, stock, image, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Failed updated menu, Id menu not found");
    }
  }

  async deleteMenuById(id) {
    const query = {
      text: "DELETE FROM menus WHERE id_menu = $1 RETURNING id_menu",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Failed deleted menu");
    }
  }
}

export default MenusModels;
