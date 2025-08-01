import InvariantError from "../exceptions/InvariantError.js";

class OrderController {
  constructor(orderModel, orderItemsModel, menuModel, validator, tokenManager) {
    this._orderModel = orderModel;
    this._orderItemsModel = orderItemsModel;
    this._menuModel = menuModel;
    this._validator = validator;
    this._tokenManager = tokenManager;

    this.postNewOrder = this.postNewOrder.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.getOrderByIdUser = this.getOrderByIdUser.bind(this);
    this.putStatusPaymentOrderHandler =
      this.putStatusPaymentOrderHandler.bind(this);
  }

  async postNewOrder(req, res) {
    this._validator.validate(req.body);
    const { idPaymentMethod, items } = req.body;
    const orderDate = new Date().toISOString();
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;

    const menuItems = items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const totalAmount = menuItems.reduce((acc, item) => acc + item.subtotal, 0);

    const idOrder = await this._orderModel.insertNewOrder({
      idUser: id_user,
      orderDate,
      totalAmount,
      idPaymentMethod,
    });

    for (let item of menuItems) {
      const stokMenu = await this._menuModel.selectStockMenuByIdMenu(
        item.idMenu
      );

      if (item.quantity > stokMenu) {
        throw new InvariantError(`Insufficient stock for ${item.idMenu}`);
      }

      await this._orderItemsModel.insertOrderItem({
        idOrder,
        idMenu: item.idMenu,
        idRestaurant: item.idRestaurant,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        note: item.note,
      });

      await this._menuModel.updateStockByIdMenu(item.idMenu, item.quantity);
    }

    return res.status(201).json({
      status: "success",
      data: {
        idOrder,
      },
    });
  }

  async getOrderById(req, res) {
    const { id } = req.params;
    const order = await this._orderModel.selectOrderById(id);
    const menuItems = await this._orderItemsModel.getItemsMenuByIdOrder(id);

    return res.status(200).json({
      status: "success",
      data: {
        order: {
          ...order,
          items: menuItems,
        },
      },
    });
  }

  async getOrderByIdUser(req, res) {
    const decodedToken = this._tokenManager.verifyAccessToken(
      req.cookies.accessToken
    );
    const { id_user } = decodedToken;
    const orders = await this._orderModel.selectOrderByIdUser(id_user);

    return res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  }

  putStatusPaymentOrderHandler(idStatusOrder) {
    return async (req, res) => {
      const { id } = req.params;
      await this._orderModel.updateStatusPaymentOrder(id, idStatusOrder);

      return res.status(200).json({
        status: "success",
        message:
          idStatusOrder === "status-1"
            ? "Order success paid"
            : "Order cancelled",
      });
    };
  }
}

export default OrderController;
