import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class OrdersModels {
  constructor(pool) {
    this._pool = pool;
  }

  async insertNewOrder({ idUser, orderDate, totalAmount, idPaymentMethod }) {
    const idOrder = `order-${nanoid(16)}`;
    const idStatus = "status-2";
    const query = {
      text: "INSERT INTO orders (id_order, id_user, order_date, total_amount, id_payment_method, id_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_order",
      values: [
        idOrder,
        idUser,
        orderDate,
        totalAmount,
        idPaymentMethod,
        idStatus,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_order) {
      throw new InvariantError("Failed adding new order");
    }

    return result.rows[0].id_order;
  }

  async selectOrderById(idOrder) {
    const query = {
      text: `SELECT orders.id_order,
                orders.order_date,
                orders.total_amount,
                payment_methods.method_name,
                payment_status.status_name
                FROM orders JOIN payment_methods
                ON orders.id_payment_method = payment_method.id_payment_method
                JOIN payment_status
                ON orders.id_status = payment_status.id_status
                WHERE orders.id_order = $1`,
      values: [idOrder],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Order not found");
    }

    return result.rows[0];
  }

  async selectOrderByIdUser(idUser) {
    const query = {
      text: `SELECT orders.id_order,
                orders.order_date,
                orders.total_amount,
                payment_methods.method_name,
                payment_status.status_name
                FROM orders JOIN payment_methods
                ON orders.id_payment_method = payment_method.id_payment_method
                JOIN payment_status
                ON orders.id_status = payment_status.id_status
                WHERE orders.id_user = $1
                ORDER BY orders.created_at`,
      values: [idUser],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  async updateStatusPaymentOrder(idOrder, newStatusOrder) {
    const query = {
      text: "UPDATE orders SET id_status = $1 WHERE id_order = $2",
      values: [idOrder, newStatusOrder],
    };

    await this._pool.query(query);
  }
}

export default OrdersModels;
