import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class OrderItemsModel {
  constructor(pool) {
    this._pool = pool;
  }

  async insertOrderItem({
    idOrder,
    idMenu,
    idRestaurant,
    quantity,
    price,
    subtotal,
    note,
  }) {
    const idOrderItem = `order_item-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO order_items (id_order_item, id_order, id_menu, id_restaurant, quantity, price, subtotal, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_order_item",
      values: [
        idOrderItem,
        idOrder,
        idMenu,
        idRestaurant,
        quantity,
        price,
        subtotal,
        note,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_order_item) {
      throw new InvariantError("Failed adding order item");
    }

    return result.rows[0].id_order_item;
  }

  async selectOrderItemsByIdRestaurant(idRestaurant) {
    const query = {
      text: `SELECT order_items.id_order,
                menus.menu_name,
                order_items.quantity,
                order_items.price,
                order_items.subtotal,
                order_items.note
                FROM order_items JOIN menus
                ON order_items.id_menu = menus.id_menu
                WHERE order_items.id_restaurant = $1`,
      values: [idRestaurant],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

export default OrderItemsModel;
